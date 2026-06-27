import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, Tag, BookOpen } from 'lucide-react';
import api from '../services/api';

interface Blog {
  id: number;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  readTime: number;
  createdAt: string;
  viewsCount: number;
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fallback seeded blogs if API is unreachable
  const fallbackBlogs: Blog[] = [
    {
      id: 1,
      title: 'Building Resilient Microservices with Resilience4j and Spring Boot',
      summary: 'Explore how to safeguard distributed REST networks from cascading service outages by implementing circuit breakers, retries, and rate limiters.',
      category: 'Backend',
      tags: ['Spring Boot', 'Microservices', 'Resilience4j', 'Circuit Breaker'],
      readTime: 5,
      createdAt: new Date().toISOString(),
      viewsCount: 142
    },
    {
      id: 2,
      title: 'Implementing Event-Driven Caching inside Spring Boot using Redis and Kafka',
      summary: 'Understand how to design a high-performance read path using the Cache-aside pattern and Kafka event-driven cache invalidation.',
      category: 'Architecture',
      tags: ['Spring Boot', 'Redis', 'Kafka', 'Caching'],
      readTime: 6,
      createdAt: new Date().toISOString(),
      viewsCount: 208
    }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get<Blog[]>('/blogs');
        setBlogs(response.data);
      } catch (err) {
        console.debug('Blog fetch failed, falling back to local seed data.', err);
        setBlogs(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = selectedCategory ? blog.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(blogs.map((b) => b.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-colors duration-300">
      <div className="glow-spot top-10 right-10"></div>
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Engineering Blog</h1>
        <p className="text-slate-400 mt-4 sm:text-lg">
          Insights on Java architectures, cache strategies, and system scalabilities.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles, keywords, tags..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/5 backdrop-blur-md focus:border-accent-purple focus:outline-none text-sm transition-all"
          />
        </div>

        {/* Categories filters */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
              selectedCategory === null
                ? 'bg-accent-purple text-white'
                : 'border border-slate-200 dark:border-white/10 text-slate-400 hover:bg-white/5'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-accent-purple text-white'
                  : 'border border-slate-200 dark:border-white/10 text-slate-400 hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Feed */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple mb-4"></div>
          <span>Loading articles...</span>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg">No articles found matching filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBlogs.map((blog) => (
            <article 
              key={blog.id} 
              className="glass-card p-8 rounded-2xl flex flex-col justify-between h-full group hover:-translate-y-1 transition-all"
            >
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="px-2.5 py-1 rounded bg-accent-purple/10 text-accent-purple font-semibold uppercase tracking-wider">
                    {blog.category}
                  </span>
                  
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{new Date(blog.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{blog.readTime} min read</span>
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold group-hover:text-accent-purple transition-colors duration-300">
                  <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                </h2>

                {/* Summary */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {blog.summary}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-slate-200 dark:border-white/5 mt-6 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {blog.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] bg-slate-200 dark:bg-white/5 px-2 py-0.5 rounded text-slate-500 font-semibold flex items-center space-x-0.5">
                      <Tag className="h-2.5 w-2.5" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                <Link
                  to={`/blog/${blog.id}`}
                  className="text-xs font-bold uppercase text-accent-purple hover:underline flex items-center space-x-1"
                >
                  <span>Read Article</span>
                  <BookOpen className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
