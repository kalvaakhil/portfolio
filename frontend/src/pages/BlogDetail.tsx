import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Calendar, Clock, Eye, ChevronLeft, Tag } from 'lucide-react';
import api from '../services/api';

interface Blog {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  readTime: number;
  createdAt: string;
  viewsCount: number;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  // Fallback seeded blogs for local rendering if API is down
  const fallbackBlogs: Blog[] = [
    {
      id: 1,
      title: 'Building Resilient Microservices with Resilience4j and Spring Boot',
      summary: 'Explore how to safeguard distributed REST networks from cascading service outages by implementing circuit breakers, retries, and rate limiters.',
      content: `# Building Resilient Microservices with Resilience4j and Spring Boot

In a microservices architecture, dependencies are inevitable. The \`order-service\` calls \`inventory-service\`, which in turn talks to \`supplier-db\`. But what happens if the inventory service becomes sluggish or experiences complete outages? Without protection, your entire call stack collapses.

This blog outlines how to safeguard your APIs using **Resilience4j** within a Spring Boot application.

---

## 1. What is a Circuit Breaker?

A circuit breaker monitors synchronous call states:
- **Closed**: Requests flow normally. If failure rates cross a limit (e.g. 50% failures), the breaker trips.
- **Open**: Calls fail immediately with a \`CallNotPermittedException\`. No requests hit the degraded service.
- **Half-Open**: After a cooldown period, some requests are let through to see if the target service has recovered.

---

## 2. Spring Boot Implementation

Add the dependency to your \`pom.xml\`:

\`\`\`xml
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-spring-boot3</artifactId>
    <version>2.2.0</version>
</dependency>
\`\`\`

### Configuration

Define settings in \`application.yml\`:

\`\`\`yaml
resilience4j.circuitbreaker:
  instances:
    inventoryService:
      slidingWindowSize: 10
      failureRateThreshold: 50
      waitDurationInOpenState: 10000
      permittedNumberOfCallsInHalfOpenState: 3
\`\`\`

### Code Annotation

Annotate your Feign or RestTemplate call service method:

\`\`\`java
@CircuitBreaker(name = "inventoryService", fallbackMethod = "fallbackInventoryCheck")
public InventoryResponse checkStock(Long productId) {
    return inventoryClient.checkStock(productId);
}

// Fallback method must have the same signature plus an Exception parameter
public InventoryResponse fallbackInventoryCheck(Long productId, Throwable t) {
    log.warn("Inventory service is down. Returning mock safety stock. Error: {}", t.getMessage());
    return new InventoryResponse(productId, true, 0); // Safe fallback
}
\`\`\`

---

## 3. Key Takeaway

Designing for failures is a signature mark of senior engineering. By configuring default fallbacks, your product degrades gracefully instead of crashing completely.

*What resilience patterns do you run in production? Let's discuss in the contact section!*
`,
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
      content: `# Event-Driven Caching with Redis and Kafka

Caching aggregate summaries (like financial dashboards or search lists) is a great way to boost app speed. But caches get stale quickly. If a user posts a transaction, how do you keep the dashboard accurate?

A generic approach is to wait for the Cache TTL (Time-To-Live) to expire (e.g., 10 minutes). However, users hate seeing stale balances. We can solve this by implementing **Event-Driven Cache Invalidation** via Kafka.

---

## The Architecture Flow

\`\`\`mermaid
sequenceDiagram
    User->>Transaction Service: Post Transaction
    Transaction Service->>PostgreSQL: Save Transaction
    Transaction Service->>Kafka: Publish "transaction-created" Event
    Kafka->>Analytics Service: Consume Event
    Analytics Service->>Redis: Evict Cached Dashboard
    User->>Analytics Service: Get Dashboard (Cache Miss)
    Analytics Service->>PostgreSQL: Calculate Fresh Dashboard
    Analytics Service->>Redis: Populate Cache
\`\`\`

---

## Implementation Steps

### 1. Spring Boot Cache Configuration

Annotate your fetch method with \`@Cacheable\`:

\`\`\`java
@Cacheable(value = "dashboards", key = "#userId")
public DashboardSummary getDashboard(Long userId) {
    log.info("Cache miss! Computing dashboard from database...");
    return computeDashboardFromDb(userId);
}
\`\`\`

### 2. Kafka Event Listener

Listen to the transaction topic. When an update occurs, evict the user's cache:

\`\`\`java
@KafkaListener(topics = "transaction-events", groupId = "analytics-group")
public void handleTransactionEvent(TransactionEvent event) {
    log.info("Received event for user: {}. Evicting cache.", event.getUserId());
    evictUserCache(event.getUserId());
}

@CacheEvict(value = "dashboards", key = "#userId")
public void evictUserCache(Long userId) {
    log.info("Dashboard cache successfully cleared for user: {}", userId);
}
\`\`\`

---

## Benefits of this Design

1. **Near-Zero Stale Data**: The dashboard remains accurate within milliseconds of a new transaction.
2. **Low Database Load**: Read transactions hit Redis 99% of the time, bypassing complex SQL operations.
3. **Graceful Fallbacks**: If Redis goes down, \`@Cacheable\` degrades to local databases seamlessly.

*Event-driven caching is the standard for high-volume modern microservice products.*
`,
      category: 'Architecture',
      tags: ['Spring Boot', 'Redis', 'Kafka', 'Caching'],
      readTime: 6,
      createdAt: new Date().toISOString(),
      viewsCount: 208
    }
  ];

  useEffect(() => {
    const fetchBlogDetails = async () => {
      if (!id) return;
      try {
        const response = await api.get<Blog>(`/blogs/${id}`);
        setBlog(response.data);
      } catch (err) {
        console.debug('Blog details query failed, fallback check.');
        const found = fallbackBlogs.find(b => b.id === parseInt(id));
        if (found) {
          setBlog(found);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple mb-4"></div>
        <span>Loading article content...</span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20 text-slate-400">
        <h2 className="text-xl font-bold">Article Not Found</h2>
        <Link to="/blog" className="text-accent-purple hover:underline mt-4 inline-block">
          Return to blog feed
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
      {/* Back button */}
      <Link
        to="/blog"
        className="text-xs font-bold uppercase text-accent-purple hover:underline mb-8 inline-flex items-center space-x-1"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Back to articles</span>
      </Link>

      <article className="space-y-6">
        {/* Category & Stats Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-b border-slate-200 dark:border-white/5 pb-4">
          <span className="px-2.5 py-1 rounded bg-accent-purple/10 text-accent-purple font-semibold uppercase tracking-wider">
            {blog.category}
          </span>
          <span className="flex items-center space-x-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{new Date(blog.createdAt).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{blog.readTime} min read</span>
          </span>
          <span className="flex items-center space-x-1">
            <Eye className="h-3.5 w-3.5" />
            <span>{blog.viewsCount} views</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          {blog.title}
        </h1>

        {/* Summary banner */}
        <div className="p-6 rounded-2xl border-l-4 border-accent-purple bg-accent-purple/5 text-sm text-slate-300 leading-relaxed italic">
          {blog.summary}
        </div>

        {/* Markdown Render Body */}
        <div className="markdown-body text-slate-300 space-y-6 leading-relaxed pt-4 text-sm sm:text-base">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-2xl sm:text-3xl font-extrabold mt-8 mb-4 text-slate-100 border-b border-white/5 pb-2" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl sm:text-2xl font-bold mt-6 mb-3 text-slate-200" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-300" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 text-slate-300 dark:text-slate-300" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
              li: ({node, ...props}) => <li className="text-slate-300" {...props} />,
              code: ({node, className, children, ...props}) => {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <pre className="bg-black/60 border border-white/5 rounded-xl p-4 overflow-x-auto my-4 text-xs font-mono text-indigo-300">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className="bg-slate-200 dark:bg-white/5 px-1.5 py-0.5 rounded text-xs font-mono text-accent-purple font-semibold" {...props}>
                    {children}
                  </code>
                );
              },
              hr: ({node, ...props}) => <hr className="border-white/5 my-8" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-slate-700 pl-4 italic my-4 text-slate-400" {...props} />
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>

        {/* Tags list */}
        <div className="flex flex-wrap gap-2 pt-8 border-t border-slate-200 dark:border-white/5">
          {blog.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center space-x-1">
              <Tag className="h-3 w-3" />
              <span>{tag}</span>
            </span>
          ))}
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
