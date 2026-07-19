import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-8">
          <AlertCircle className="h-12 w-12 text-[#2563EB] dark:text-blue-400" />
        </div>
        
        <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Page not found</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-[#2563EB] hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
        >
          <Home className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
