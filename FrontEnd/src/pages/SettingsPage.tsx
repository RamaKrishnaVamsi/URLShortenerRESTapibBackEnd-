import { Bell, Shield, Smartphone, Globe, CreditCard } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your app preferences and settings</p>
      </div>

      <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">Appearance</h2>
          
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <Smartphone className="h-5 w-5 mr-3 text-slate-400" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Dark Mode</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Toggle dark mode interface</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={theme === 'dark'} onChange={toggleTheme} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-[#2563EB]"></div>
            </label>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">Notifications</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-3 text-slate-400" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Email Alerts</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Receive emails about link milestones</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-[#2563EB]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-3 text-slate-400" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Marketing Emails</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Receive news and special offers</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-[#2563EB]"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">Billing</h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 mr-3 text-slate-400" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Current Plan: Free</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Upgrade to Pro for more features</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#2563EB] hover:bg-blue-600 text-white font-medium rounded-lg transition-colors text-sm">
              Upgrade
            </button>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-red-50/50 dark:bg-red-900/10">
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4 border-b border-red-200 dark:border-red-800/30 pb-2">Danger Zone</h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-3 text-red-500" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Delete Account</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Permanently delete your account and all data</p>
              </div>
            </div>
            <button className="px-4 py-2 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium rounded-lg transition-colors text-sm">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
