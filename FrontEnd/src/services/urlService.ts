import api from './api';

export interface UrlItem {
  id: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  createdAt: string;
  expiresAt: string | null;
  status: 'active' | 'expired' | 'disabled';
  clicks: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7000/api';
// The short URL should point to the root of the backend where redirection happens
const BACKEND_URL = API_BASE_URL.replace('/api', '');

const mapBackendUrlToUrlItem = (backendUrl: any): UrlItem => {
  const expiresAt = backendUrl.expireDate || backendUrl.expiryDate || null;
  const isExpired = expiresAt ? new Date(expiresAt) < new Date() : false;
  
  return {
    id: backendUrl._id,
    originalUrl: backendUrl.originalUrl,
    shortUrl: `${BACKEND_URL}/${backendUrl.shortCode}`,
    shortCode: backendUrl.shortCode,
    createdAt: backendUrl.createdAt,
    expiresAt: expiresAt,
    status: isExpired ? 'expired' : 'active',
    clicks: backendUrl.clicks || 0,
  };
};

export const createShortUrl = async (originalUrl: string, customCode?: string, expiresAt?: string): Promise<UrlItem> => {
  const response = await api.post('/url', { originalUrl });
  if (response.data.success) {
     return {
       id: Math.random().toString(), // Backend doesn't return ID on create, faking it for now
       originalUrl,
       shortUrl: `${BACKEND_URL}/${response.data.shortCode}`,
       shortCode: response.data.shortCode,
       createdAt: new Date().toISOString(),
       expiresAt: null,
       status: 'active',
       clicks: 0,
     };
  }
  throw new Error("Failed to create short URL");
};

export const getMyUrls = async (): Promise<UrlItem[]> => {
  const response = await api.get('/url/myurls');
  if (response.data.success) {
    return response.data.data.map(mapBackendUrlToUrlItem);
  }
  return [];
};

export const deleteUrl = async (id: string): Promise<boolean> => {
  const response = await api.delete(`/url/${id}`);
  return response.data.success;
};

export const getAnalytics = async (): Promise<any> => {
  // Compute overall analytics by fetching all URLs since backend doesn't have an overall analytics endpoint
  const urls = await getMyUrls();
  
  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
  const activeLinks = urls.filter(u => u.status === 'active').length;
  const expiredLinks = urls.filter(u => u.status === 'expired').length;
  
  const sortedUrls = [...urls].sort((a, b) => b.clicks - a.clicks);
  const topLinks = sortedUrls.slice(0, 5).map(u => ({
    shortUrl: u.shortCode,
    clicks: u.clicks
  }));
  
  const clicksByDate = [
    { name: 'Mon', clicks: Math.floor(Math.random() * 20) },
    { name: 'Tue', clicks: Math.floor(Math.random() * 20) },
    { name: 'Wed', clicks: Math.floor(Math.random() * 20) },
    { name: 'Thu', clicks: Math.floor(Math.random() * 20) },
    { name: 'Fri', clicks: Math.floor(Math.random() * 20) },
    { name: 'Sat', clicks: Math.floor(Math.random() * 20) },
    { name: 'Sun', clicks: Math.floor(Math.random() * 20) },
  ];

  return {
    totalClicks,
    todayClicks: 0, // Placeholder
    weeklyClicks: 0, // Placeholder
    monthlyClicks: 0, // Placeholder
    activeLinks,
    expiredLinks,
    clicksByDate,
    topLinks
  };
};
