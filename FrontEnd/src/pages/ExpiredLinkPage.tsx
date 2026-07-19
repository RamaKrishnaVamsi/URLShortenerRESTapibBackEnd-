import { Link } from 'react-router-dom';
import { Home, Clock } from 'lucide-react';

export default function ExpiredLinkPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md bg-white dark:bg-[#1E293B] p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-6">
          <Clock className="h-10 w-10 text-amber-600 dark:text-amber-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Link Expired</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          The shortened link you are trying to access has expired and is no longer available.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-medium rounded-lg transition-colors w-full justify-center"
        >
          <Home className="mr-2 h-5 w-5" />
          Create a New Link
        </Link>
      </div>
    </div>
  );
}
