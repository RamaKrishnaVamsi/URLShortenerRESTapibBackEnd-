import { Link } from 'react-router-dom';
import { Home, Link as LinkIcon, XCircle } from 'lucide-react';

export default function InvalidLinkPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md bg-white dark:bg-[#1E293B] p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="relative inline-flex mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30">
            <LinkIcon className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-white dark:bg-[#1E293B] rounded-full p-1">
            <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Invalid Link</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          The link you clicked doesn't seem to exist. It might have been deleted or the URL has a typo.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-[#2563EB] hover:bg-blue-600 text-white font-medium rounded-lg transition-colors w-full justify-center"
        >
          <Home className="mr-2 h-5 w-5" />
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
