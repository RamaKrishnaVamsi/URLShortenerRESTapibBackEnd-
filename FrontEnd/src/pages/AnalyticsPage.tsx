import { useState, useEffect } from 'react';
import { getAnalytics } from '../services/urlService';
import { BarChart3, TrendingUp, MousePointerClick, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (error) {
        toast.error('Failed to load analytics data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2563EB] mb-4"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center p-8 bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-slate-800">
        <p className="text-slate-500 dark:text-slate-400">Failed to load analytics data.</p>
      </div>
    );
  }

  const maxDailyClicks = Math.max(...analytics.clicksByDate.map((d: any) => d.clicks), 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track the performance of your links</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center text-slate-500 dark:text-slate-400 mb-4">
            <MousePointerClick className="h-5 w-5 mr-2" />
            <span className="font-medium">Total Clicks</span>
          </div>
          <div className="text-4xl font-bold text-slate-900 dark:text-white">{analytics.totalClicks}</div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center text-slate-500 dark:text-slate-400 mb-4">
            <LinkIcon className="h-5 w-5 mr-2" />
            <span className="font-medium">Active Links</span>
          </div>
          <div className="text-4xl font-bold text-slate-900 dark:text-white text-[#2563EB]">{analytics.activeLinks}</div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center text-slate-500 dark:text-slate-400 mb-4">
            <TrendingUp className="h-5 w-5 mr-2" />
            <span className="font-medium">Top Performing</span>
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white truncate">
            {analytics.topLinks[0]?.shortUrl || 'N/A'}
          </div>
          <div className="text-sm text-slate-500 mt-1">{analytics.topLinks[0]?.clicks || 0} clicks</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simple Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-[#2563EB]" />
            Clicks Over Time (This Week)
          </h2>
          
          <div className="h-64 flex items-end justify-between gap-2 md:gap-4 mt-8">
            {analytics.clicksByDate.map((day: any) => {
              const heightPercentage = (day.clicks / maxDailyClicks) * 100;
              return (
                <div key={day.name} className="flex flex-col items-center flex-1 group">
                  <div className="w-full relative flex justify-center">
                    {/* Tooltip */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                      {day.clicks} clicks
                    </div>
                    {/* Bar */}
                    <div 
                      className="w-full max-w-[3rem] bg-blue-100 dark:bg-blue-900/30 group-hover:bg-[#2563EB] dark:group-hover:bg-[#2563EB] rounded-t-sm transition-all duration-300 relative overflow-hidden"
                      style={{ height: `${Math.max(heightPercentage, 2)}%`, minHeight: '8px' }}
                    >
                      <div className="absolute bottom-0 w-full bg-[#2563EB] opacity-100" style={{ height: '100%' }}></div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {day.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Links List */}
        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Top Performing Links</h2>
          
          {analytics.topLinks.length === 0 ? (
            <div className="text-center py-8 text-slate-500">No data available</div>
          ) : (
            <div className="space-y-4">
              {analytics.topLinks.map((link: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center overflow-hidden pr-4">
                    <span className="text-slate-400 font-mono text-sm mr-3">{(index + 1).toString().padStart(2, '0')}</span>
                    <span className="font-medium text-slate-900 dark:text-white truncate" title={link.shortUrl}>
                      {link.shortUrl}
                    </span>
                  </div>
                  <div className="flex items-center text-sm font-semibold text-[#2563EB] bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md shrink-0">
                    {link.clicks}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
