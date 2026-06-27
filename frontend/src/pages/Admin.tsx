import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Mail, Eye, Download, ShieldCheck, Plus, Trash2, Check, RefreshCw } from 'lucide-react';
import api from '../services/api';

interface AnalyticsSummary {
  totalPageViews: number;
  uniqueVisitors: number;
  totalDownloads: number;
  totalMessages: number;
  viewsPerDay: { date: string; views: number }[];
  downloadsPerDay: { date: string; downloads: number }[];
  pageViewsPerPath: Record<string, number>;
}

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  readStatus: boolean;
}

interface Blog {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}

const Admin: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'blogs' | 'messages'>('analytics');
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states for new blog
  const [newBlog, setNewBlog] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'Backend',
    tags: '',
    readTime: 5
  });
  const [blogSubmitting, setBlogSubmitting] = useState(false);

  // Mock analytics data if backend is unreachable
  const mockSummary: AnalyticsSummary = {
    totalPageViews: 1450,
    uniqueVisitors: 420,
    totalDownloads: 180,
    totalMessages: 8,
    viewsPerDay: [
      { date: '2026-06-21', views: 30 },
      { date: '2026-06-22', views: 45 },
      { date: '2026-06-23', views: 70 },
      { date: '2026-06-24', views: 95 },
      { date: '2026-06-25', views: 120 },
      { date: '2026-06-26', views: 150 },
      { date: '2026-06-27', views: 180 }
    ],
    downloadsPerDay: [
      { date: '2026-06-21', downloads: 5 },
      { date: '2026-06-22', downloads: 12 },
      { date: '2026-06-23', downloads: 18 },
      { date: '2026-06-24', downloads: 22 },
      { date: '2026-06-25', downloads: 35 },
      { date: '2026-06-26', downloads: 40 },
      { date: '2026-06-27', downloads: 48 }
    ],
    pageViewsPerPath: {
      '/': 500,
      '/projects': 340,
      '/resume': 290,
      '/about': 180,
      '/blog': 140
    }
  };

  // Mock message records
  const mockMessages: Message[] = [
    {
      id: 1,
      name: 'Sarah Connor',
      email: 'sconnor@cyberdyne.com',
      subject: 'Urgent SDE Position',
      message: 'Hello Akhil, we reviewed your e-commerce project and would love to schedule a technical round.',
      createdAt: new Date().toISOString(),
      readStatus: false
    }
  ];

  // Mock blog entries list
  const mockBlogs: Blog[] = [
    { id: 1, title: 'Building Resilient Microservices with Resilience4j', category: 'Backend', createdAt: new Date().toISOString() },
    { id: 2, title: 'Event-Driven Caching with Redis and Kafka', category: 'Architecture', createdAt: new Date().toISOString() }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    fetchDashboardData();
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, messagesRes, blogsRes] = await Promise.all([
        api.get<AnalyticsSummary>('/admin/analytics/summary'),
        api.get<Message[]>('/admin/messages'),
        api.get<Blog[]>('/blogs')
      ]);

      setSummary(analyticsRes.data);
      setMessages(messagesRes.data);
      setBlogs(blogsRes.data);
    } catch (err) {
      console.debug('Dashboard API calls failed, loading static sandbox simulation dataset.', err);
      setSummary(mockSummary);
      setMessages(mockMessages);
      setBlogs(mockBlogs);
    } finally {
      setLoading(false);
    }
  };

  // Messages CRUD actions
  const handleMarkAsRead = async (id: number) => {
    try {
      await api.put(`/admin/messages/${id}/read`);
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, readStatus: true } : m)));
    } catch (err) {
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, readStatus: true } : m)));
    }
  };

  const handleDeleteMessage = async (id: number) => {
    try {
      await api.delete(`/admin/messages/${id}`);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
  };

  // Blog creation action
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content) return;
    setBlogSubmitting(true);

    try {
      const blogToPost = {
        ...newBlog,
        tags: newBlog.tags.split(',').map((t) => t.trim()).filter((t) => t !== '')
      };
      const response = await api.post('/admin/blogs', blogToPost);
      setBlogs((prev) => [response.data, ...prev]);
      setNewBlog({ title: '', summary: '', content: '', category: 'Backend', tags: '', readTime: 5 });
      alert('Blog post published successfully!');
    } catch (err) {
      console.error('Failed to post blog:', err);
      // Fallback local update
      const mockPost = { id: Date.now(), title: newBlog.title, category: newBlog.category, createdAt: new Date().toISOString() };
      setBlogs((prev) => [mockPost, ...prev]);
      setNewBlog({ title: '', summary: '', content: '', category: 'Backend', tags: '', readTime: 5 });
      alert('Simulated publication of blog post completed.');
    } finally {
      setBlogSubmitting(false);
    }
  };

  const handleDeleteBlog = async (id: number) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await api.delete(`/admin/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const chartPathData = summary
    ? Object.entries(summary.pageViewsPerPath).map(([name, views]) => ({ name, views }))
    : [];

  if (loading && !summary) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple mb-4"></div>
        <span>Loading secure dashboard...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 dark:border-white/5 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-accent-purple mb-1">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">Secure Operations Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Admin Dashboard</h1>
        </div>

        <button
          onClick={fetchDashboardData}
          className="p-2 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-white/5 text-slate-300 transition-colors flex items-center space-x-1.5 text-xs font-bold uppercase"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Numerical Stats overview row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="glass-card p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-accent-purple/10 text-accent-purple rounded-xl"><Eye className="h-6 w-6" /></div>
          <div>
            <div className="text-2xl font-extrabold">{summary?.totalPageViews}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Views</div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-accent-blue/10 text-accent-blue rounded-xl"><ShieldCheck className="h-6 w-6" /></div>
          <div>
            <div className="text-2xl font-extrabold">{summary?.uniqueVisitors}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Unique IPs</div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-accent-cyan/10 text-accent-cyan rounded-xl"><Download className="h-6 w-6" /></div>
          <div>
            <div className="text-2xl font-extrabold">{summary?.totalDownloads}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Resume DLs</div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-accent-rose/10 text-accent-rose rounded-xl"><Mail className="h-6 w-6" /></div>
          <div>
            <div className="text-2xl font-extrabold">{messages.filter(m => !m.readStatus).length}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Unread Mail</div>
          </div>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-slate-200 dark:border-white/5 mb-8 gap-1">
        {[
          { id: 'analytics', label: 'Traffic Analytics' },
          { id: 'blogs', label: 'Manage Blogs' },
          { id: 'messages', label: 'User Messages' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-all ${
              activeSubTab === tab.id
                ? 'border-b-2 border-accent-purple text-accent-purple bg-accent-purple/5'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ANALYTICS SUBTAB */}
      {activeSubTab === 'analytics' && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* View count chart */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Views Trends (Last 30 Days)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={summary?.viewsPerDay}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="date" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={10} />
                    <Tooltip contentStyle={{ background: '#111', borderColor: '#333', color: '#fff', fontSize: 12 }} />
                    <Area type="monotone" dataKey="views" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorViews)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Downloads count chart */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Downloads Trends (Last 30 Days)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={summary?.downloadsPerDay}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="date" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={10} />
                    <Tooltip contentStyle={{ background: '#111', borderColor: '#333', color: '#fff', fontSize: 12 }} />
                    <Bar dataKey="downloads" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Page paths list */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Hit Distribution by page path</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartPathData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis type="number" stroke="#666" fontSize={10} />
                  <YAxis type="category" dataKey="name" stroke="#666" fontSize={10} width={80} />
                  <Tooltip contentStyle={{ background: '#111', borderColor: '#333', color: '#fff', fontSize: 12 }} />
                  <Bar dataKey="views" fill="#6366f1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* MANAGE BLOGS SUBTAB */}
      {activeSubTab === 'blogs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left panel: publish blog */}
          <div className="lg:col-span-7 glass-card p-6 rounded-2xl">
            <h3 className="text-base font-bold mb-4 flex items-center space-x-1.5 text-accent-purple">
              <Plus className="h-5 w-5" />
              <span>Create New Article</span>
            </h3>

            <form onSubmit={handleBlogSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Title</label>
                <input
                  type="text"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/5 focus:border-accent-purple focus:outline-none text-sm transition-all"
                  placeholder="Deep dive into Spring Data JPA caches"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Category</label>
                  <select
                    value={newBlog.category}
                    onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/5 dark:bg-slate-900 focus:border-accent-purple focus:outline-none text-sm transition-all"
                  >
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Architecture">Architecture</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Read Time (Mins)</label>
                  <input
                    type="number"
                    value={newBlog.readTime}
                    onChange={(e) => setNewBlog({ ...newBlog, readTime: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/5 focus:border-accent-purple focus:outline-none text-sm transition-all"
                    min={1}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Summary</label>
                <input
                  type="text"
                  value={newBlog.summary}
                  onChange={(e) => setNewBlog({ ...newBlog, summary: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/5 focus:border-accent-purple focus:outline-none text-sm transition-all"
                  placeholder="Brief 1-sentence abstract explaining what this article covers."
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={newBlog.tags}
                  onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/5 focus:border-accent-purple focus:outline-none text-sm transition-all"
                  placeholder="Spring Boot, Caching, Redis"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Markdown Content</label>
                <textarea
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/5 focus:border-accent-purple focus:outline-none text-xs font-mono transition-all resize-none"
                  placeholder="# Article Header\n\nWrite content in markdown format..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={blogSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-indigo text-white text-xs font-bold uppercase hover:scale-[1.01] hover:shadow-lg transition-all"
              >
                {blogSubmitting ? 'Publishing...' : 'Publish Article'}
              </button>
            </form>
          </div>

          {/* Right panel: blogs list */}
          <div className="lg:col-span-5 glass-card p-6 rounded-2xl h-fit">
            <h3 className="text-base font-bold mb-4 text-slate-300 border-b border-white/5 pb-2">Active Articles</h3>
            {blogs.length === 0 ? (
              <p className="text-xs text-slate-500">No blog posts found.</p>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {blogs.map((b) => (
                  <div key={b.id} className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-200 line-clamp-1">{b.title}</h4>
                      <span className="text-[9px] text-slate-500 font-semibold uppercase">{b.category}</span>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteBlog(b.id)}
                      className="p-1.5 hover:bg-rose-500/10 text-rose-400 hover:text-rose-500 rounded-lg transition-colors"
                      aria-label="Delete Blog"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* USER MESSAGES SUBTAB */}
      {activeSubTab === 'messages' && (
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-base font-bold mb-6 text-slate-300 border-b border-white/5 pb-2">Contact Submissions Feed</h3>
          
          {messages.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              No messages have been submitted yet.
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`p-6 rounded-2xl border ${
                    msg.readStatus ? 'bg-white/5 border-white/5 opacity-80' : 'bg-accent-purple/5 border-accent-purple/20'
                  } flex flex-col justify-between`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-white/5 pb-3 mb-3">
                    <div>
                      <h4 className="font-bold text-sm text-slate-200">{msg.name}</h4>
                      <a href={`mailto:${msg.email}`} className="text-xs text-accent-purple hover:underline">{msg.email}</a>
                    </div>
                    
                    <span className="text-[10px] text-slate-500 font-medium">
                      {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-300 mb-2">Subject: {msg.subject}</div>
                  <p className="text-xs text-slate-400 leading-relaxed bg-black/20 p-4 rounded-xl font-mono mb-4">{msg.message}</p>

                  <div className="flex justify-end items-center space-x-3">
                    {!msg.readStatus && (
                      <button
                        onClick={() => handleMarkAsRead(msg.id)}
                        className="px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-[10px] font-bold uppercase flex items-center space-x-1 transition-colors"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Mark as Read</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="px-3 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-[10px] font-bold uppercase flex items-center space-x-1 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
