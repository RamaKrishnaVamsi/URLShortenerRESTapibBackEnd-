import { useState, useEffect } from 'react';
import { createShortUrl, getMyUrls, deleteUrl, type UrlItem } from '../services/urlService';
import { Copy, Trash2, ExternalLink, Plus, Search, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newUrl, setNewUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUrls = async () => {
    try {
      const data = await getMyUrls();
      setUrls(data);
    } catch (error) {
      toast.error('Failed to load your links');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    setIsCreating(true);
    try {
      await createShortUrl(newUrl, customCode);
      toast.success('Link shortened successfully!');
      setNewUrl('');
      setCustomCode('');
      fetchUrls(); // Refresh the list
    } catch (error) {
      toast.error('Failed to create short link. The custom code might be taken.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this link?')) return;
    
    try {
      await deleteUrl(id);
      toast.success('Link deleted');
      setUrls(urls.filter(url => url.id !== id));
    } catch (error) {
      toast.error('Failed to delete link');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const filteredUrls = urls.filter(url => 
    url.originalUrl.toLowerCase().includes(searchQuery.toLowerCase()) || 
    url.shortCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your shortened links</p>
        </div>
      </div>

      {/* Create New Link Section */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
          <Plus className="mr-2 h-5 w-5 text-[#2563EB]" />
          Create New Link
        </h2>
        <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="url"
              required
              placeholder="Paste long URL here (https://...)"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all dark:text-white"
            />
          </div>
          {/* Custom code isn't fully supported by backend yet, but we'll include it for the UI */}
          <div className="md:w-48">
            <input
              type="text"
              placeholder="Custom alias (opt)"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={isCreating}
            className="px-6 py-2.5 bg-[#2563EB] hover:bg-blue-600 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isCreating ? 'Shortening...' : 'Shorten'}
          </button>
        </form>
      </div>

      {/* Links List Section */}
      <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Your Links</h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent dark:text-white"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Loading your links...</div>
        ) : filteredUrls.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <LinkIcon className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No links found</h3>
            <p className="text-slate-500 dark:text-slate-400">
              {searchQuery ? "No links match your search query." : "You haven't shortened any links yet."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredUrls.map((url) => (
              <div key={url.id} className="p-4 sm:p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-1">
                    <a 
                      href={url.shortUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#2563EB] dark:text-blue-400 font-medium font-mono text-lg flex items-center hover:truncate"
                    >
                      {url.shortUrl.replace(/^https?:\/\//, '')}
                      <ExternalLink className="ml-1.5 h-4 w-4" />
                    </a>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      url.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {url.status.charAt(0).toUpperCase() + url.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm truncate flex items-center">
                    <span className="truncate max-w-md">{url.originalUrl}</span>
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-slate-400">
                    <span>{new Date(url.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="font-medium text-slate-600 dark:text-slate-300">{url.clicks} clicks</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => copyToClipboard(url.shortUrl)}
                    className="p-2 text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="Copy Link"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(url.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete Link"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
