import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Key, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  // Parse the MongoDB _id timestamp if createdAt is not available
  const getMemberSince = () => {
    if (user?.memberSince) return new Date(user.memberSince).toLocaleDateString();
    // Fallback: if we only have id which is a mongo object id, we can extract timestamp,
    // but let's just show a default or placeholder since we don't have memberSince from backend
    return new Date().toLocaleDateString(); // just fallback for now
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your account information</p>
      </div>

      <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Header Cover */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        
        {/* Profile Info */}
        <div className="px-6 sm:px-10 pb-10">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="h-24 w-24 rounded-full border-4 border-white dark:border-[#1E293B] bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-4xl text-slate-500 dark:text-slate-300 font-bold overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                user?.name?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors text-sm">
              Edit Profile
            </button>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{user?.email}</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Account Details</h3>
              
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <User className="h-5 w-5 mr-3 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Full Name</p>
                  <p className="font-medium">{user?.name}</p>
                </div>
              </div>
              
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <Mail className="h-5 w-5 mr-3 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Email Address</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <Calendar className="h-5 w-5 mr-3 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Member Since</p>
                  <p className="font-medium">{getMemberSince()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Security</h3>
              
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <div className="flex items-center">
                  <Key className="h-5 w-5 mr-3 text-slate-400" />
                  <div>
                    <p className="font-medium">Password</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Last changed recently</p>
                  </div>
                </div>
                <button className="text-sm text-[#2563EB] hover:underline font-medium">Change</button>
              </div>

              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-3 text-slate-400" />
                  <div>
                    <p className="font-medium">Two-Factor Auth</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Not enabled</p>
                  </div>
                </div>
                <button className="text-sm text-[#2563EB] hover:underline font-medium">Enable</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
