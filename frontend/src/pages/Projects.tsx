import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Server, Database, Key, Cpu, HelpCircle, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  businessProblem: string;
  solution: string;
  features: string[];
  challenges: string;
  lessonsLearned: string;
  performanceOptimizations: string;
  securityFeatures: string;
  dbDesign: { table: string; columns: string; description: string }[];
  apiDocs: { method: string; path: string; desc: string; roles: string }[];
}

const Projects: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'sequence' | 'database' | 'challenges'>('overview');

  const projectsData: Project[] = [
    {
      id: 1,
      title: 'Enterprise Microservices E-Commerce Platform',
      subtitle: '7-Service Checkout Engine (Spring Boot + React)',
      description: 'Distributed retail checkout system featuring asymmetric security gateways, Resilience4j circuit breakers, and transactional event outbox publishers.',
      techStack: ['Spring Boot', 'React', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'AWS', 'JWT', 'Eureka'],
      githubUrl: 'https://github.com/kalvaakhil/Web-Dev/tree/main/ShoppingApp',
      liveUrl: 'https://shopping-app.akhilkalva.dev',
      businessProblem: 'Traditional monolithic storefronts experience database locking during flash sales, coupling cart sessions, and total checkout crashes if external shipping APIs degrade.',
      solution: 'Rebuilt the application into 7 domains: Products, Inventory, Orders, Payments, Shipping, Reviews, and Notifications. Eureka handles discovery, and the Spring Cloud Gateway acts as a perimeter guard validating JWT headers. Downstream Feign calls are protected by circuit breakers and retries.',
      features: [
        'JWT-Auth perimeter: Token check at edge gateway with downstream trusted user-identity headers.',
        'Resilience4j boundaries: Circuit breakers on inventory requests fall back to cached stock states.',
        'Outbox pattern: Order checkout events are written locally and sent to Kafka via a dedicated scheduler.',
        'Atomic Stock updates: Optimistic locking on postgres inventory ensures product stock consistency.'
      ],
      challenges: 'We resolved order inconsistencies. If a user paid but the checkout service failed to dispatch Kafka emails, orders were stranded in a half-completed state.',
      lessonsLearned: 'Implemented transactional event-outbox patterns. Orders are saved alongside checkout events in the same DB transaction, then a background worker polls and dispatches to Kafka, ensuring ultimate consistency.',
      performanceOptimizations: 'Redis catalog caching cut latency on product pages by 75%. Cache eviction runs asynchronously via Kafka update listeners to avoid locking main threads.',
      securityFeatures: 'Asymmetric RS256 token validation. The edge Gateway verifies user sessions using a public key, eliminating signature verification requests to downstream auth services.',
      dbDesign: [
        { table: 'users', columns: 'id (PK), username (UQ), password_hash, email, role', description: 'Admin and client authorization profiles.' },
        { table: 'products', columns: 'id (PK), name, description, price, stock, version', description: 'Item inventory with version fields for optimistic locking.' },
        { table: 'orders', columns: 'id (PK), user_id, total_amount, status, created_at', description: 'Tracks order items, total balances, and state.' },
        { table: 'outbox_events', columns: 'id (PK), aggregate_id, event_type, payload, status', description: 'Transactional outbox records for Kafka publishing.' }
      ],
      apiDocs: [
        { method: 'POST', path: '/api/auth/login', desc: 'Authenticates username and issues access token', roles: 'Public' },
        { method: 'GET', path: '/api/products', desc: 'Lists product catalog (Cached via Redis)', roles: 'Public' },
        { method: 'POST', path: '/api/admin/products', desc: 'Adds new product item (Evicts catalog cache)', roles: 'Admin' },
        { method: 'POST', path: '/api/orders/checkout', desc: 'Initiates payment and writes outbox event', roles: 'User' }
      ]
    },
    {
      id: 2,
      title: 'Enterprise Personal Finance & Wealth Management Platform',
      subtitle: '8-Service FinFlow Analytics (Spring Boot + React)',
      description: 'Wealth analytics application with Kafka event-driven notification triggers, daily aggregate caches, and customizable transaction reports.',
      techStack: ['Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Kafka', 'JWT', 'AWS', 'Recharts'],
      githubUrl: 'https://github.com/kalvaakhil/Web-Dev/tree/main/FinanceMonitoring%20System',
      liveUrl: 'https://finflow.akhilkalva.dev',
      businessProblem: 'Retrieving transaction records and aggregating category budgets across multiple bank profiles results in slow database queries and stale reports.',
      solution: 'Constructed isolated services for Expense tracking, Budgeting, Investment logs, Analytics, and Notifications. Kafka topics update dashboard aggregates asynchronously, caching calculated chart payloads directly in Redis for quick dashboard fetches.',
      features: [
        'Interactive Charts: Wealth distribution and spending curves drawn live using Recharts.',
        'Real-time Alerts: Alerts dispatch instantly via Kafka topic links if a category exceeds budget rules.',
        'Document Exporter: Compiles dynamic H2/Postgres records into PDF balances and Excel/CSV spreadsheets.',
        'Credit Score Evaluator: Evaluates spending to rank financial health.'
      ],
      challenges: 'Jackson entity proxy loop error. Fetching JPA models with uninitialized lazy proxy relationships triggered circular JSON serialization loops and 500 endpoint errors.',
      lessonsLearned: 'Introduced a clean DTO mapping layer using MapStruct, separating data representation from model entities. Never expose raw JPA models to controller responses.',
      performanceOptimizations: 'Configured a grace-degrading cache fallback. If Redis fails, the system switches to in-memory ConcurrentHashMap cache containers without throwing errors.',
      securityFeatures: 'BCrypt-encrypted OTPs. Expiring, rate-limited tokens secure sensitive password reset flows.',
      dbDesign: [
        { table: 'expenses', columns: 'id (PK), user_id, category, amount, date, desc', description: 'Client spending logs.' },
        { table: 'budgets', columns: 'id (PK), user_id, category, limit_amount, current_spend', description: 'Sets monthly limits per expense type.' },
        { table: 'investments', columns: 'id (PK), user_id, asset_type, purchase_price, quantity', description: 'Tracks equity and commodity profiles.' }
      ],
      apiDocs: [
        { method: 'GET', path: '/api/analytics/dashboard', desc: 'Fetches cached budget and spending aggregations', roles: 'User' },
        { method: 'POST', path: '/api/expenses', desc: 'Records transaction, triggers Kafka budget checks', roles: 'User' },
        { method: 'GET', path: '/api/admin/analytics/summary', desc: 'Aggregates visitor and download metrics', roles: 'Admin' }
      ]
    },
    {
      id: 3,
      title: 'AI Job Search Automation Platform',
      subtitle: 'NLP Listing Matcher & Tracker (Spring Boot + React)',
      description: 'Web scraper and matching portal that parses job listings, grades resume keyword density using text analytics, and manages candidate workflows.',
      techStack: ['Spring Boot', 'React', 'PostgreSQL', 'React Query', 'Axios', 'Bootstrap', 'Swagger'],
      githubUrl: 'https://github.com/kalvaakhil/Web-Dev',
      liveUrl: 'https://jobsearch.akhilkalva.dev',
      businessProblem: 'Comparing resume keywords manually against dozens of active job descriptions on different platforms wastes hundreds of hours and leads to slow submission rates.',
      solution: 'Created an automation dashboard that schedules scrapers for online postings, indexes description texts in PostgreSQL, and runs a semantic comparison check to grade candidate CV alignment.',
      features: [
        'Resume Grading: Scores uploaded resumes against postings to highlight missing technical terms.',
        'Kanban Tracker: Interactive drag-and-drop board (Applied, Phone Screen, Technical, Offer).',
        'Scraper Cronjobs: Spring scheduled jobs pull and parse new job links from target portals.',
        'Recruiter log: Directory to track email threads, contact cards, and scheduled interview dates.'
      ],
      challenges: 'Deduplicating scrapings. Identical job openings published on different portals with slight differences in wording created duplicate database records.',
      lessonsLearned: 'Built a deduplication filter. The scheduler evaluates incoming posts using Jaccard text similarity index and checks title/company hashes to merge duplicates.',
      performanceOptimizations: 'Integrated React Query (TanStack Query) for state caching, reducing server queries by 45% and providing optimistic frontend updates.',
      securityFeatures: 'Validated session cookies, CSRF protection headers, and query parameter filtering to block injection attempts.',
      dbDesign: [
        { table: 'jobs', columns: 'id (PK), title, company, description, match_score, status', description: 'Indexed job openings.' },
        { table: 'applications', columns: 'id (PK), job_id, stage, applied_date, follow_up_date', description: 'Tracks kanban progress details.' },
        { table: 'resumes', columns: 'id (PK), file_name, text_content, upload_date', description: 'Client CV files for NLP parsing.' }
      ],
      apiDocs: [
        { method: 'GET', path: '/api/jobs', desc: 'Lists job catalog (supports query filters)', roles: 'User' },
        { method: 'POST', path: '/api/jobs/{id}/match', desc: 'Grades resume against specific job listing', roles: 'User' },
        { method: 'PUT', path: '/api/applications/{id}/stage', desc: 'Updates application kanban category status', roles: 'User' }
      ]
    }
  ];

  const handleProjectSelect = (projectId: number) => {
    setSelectedProjectId(projectId);
    setActiveTab('overview');
  };

  const activeProject = projectsData.find((p) => p.id === selectedProjectId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-colors duration-300">
      <div className="glow-spot top-1/3 left-10"></div>
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Portfolio Projects</h1>
        <p className="text-slate-400 mt-4 sm:text-lg">
          Click on any card to explore full architecture configurations, databases, and bug walkthroughs.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!selectedProjectId ? (
          /* PROJECT LIST GRID */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {projectsData.map((project) => (
              <div 
                key={project.id} 
                className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between h-full group"
              >
                <div className="p-6">
                  {/* Technology icons */}
                  <div className="flex items-center space-x-2 text-accent-purple mb-4">
                    <Server className="h-5 w-5" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Enterprise Architecture</span>
                  </div>

                  <h2 className="text-xl font-bold group-hover:text-accent-purple transition-colors duration-300">
                    {project.title}
                  </h2>
                  <p className="text-xs font-semibold text-slate-400 mt-1">{project.subtitle}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="p-6 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/10">
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/5 rounded text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-1 bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/5 rounded text-[10px] font-semibold text-slate-500">
                        +{project.techStack.length - 4} More
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleProjectSelect(project.id)}
                      className="px-4 py-2 bg-accent-purple text-white text-xs font-bold uppercase rounded-lg hover:bg-accent-purple/90 flex items-center space-x-1 hover:scale-105 transition-all"
                    >
                      <span>Explore Specs</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                    
                    <div className="flex items-center space-x-3">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-100 transition-colors" aria-label="GitHub">
                        <GithubIcon className="h-4 w-4" />
                      </a>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-100 transition-colors" aria-label="Live Demo">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          /* PROJECT SPECS DETAIL VIEW */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Header / Back button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/5 pb-6">
              <div>
                <button
                  onClick={() => setSelectedProjectId(null)}
                  className="text-xs font-semibold uppercase text-accent-purple hover:underline mb-2 flex items-center space-x-1"
                >
                  &larr; Back to list
                </button>
                <h2 className="text-2xl sm:text-3xl font-extrabold">{activeProject?.title}</h2>
                <p className="text-sm font-semibold text-slate-400 mt-1">{activeProject?.subtitle}</p>
              </div>

              <div className="flex items-center space-x-3 self-end sm:self-auto">
                <a
                  href={activeProject?.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-bold uppercase hover:bg-white/5 flex items-center space-x-1.5 transition-colors"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>Repository</span>
                </a>
                <a
                  href={activeProject?.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-accent-purple rounded-lg text-xs font-bold uppercase text-white hover:bg-accent-purple/90 flex items-center space-x-1.5 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>

            {/* Interactive Specs tabs switcher */}
            <div className="flex flex-wrap border-b border-slate-200 dark:border-white/5 gap-1">
              {[
                { id: 'overview', label: 'Overview', icon: <Layers className="h-4 w-4" /> },
                { id: 'architecture', label: 'Architecture', icon: <Server className="h-4 w-4" /> },
                { id: 'sequence', label: 'Sequence Flow', icon: <Cpu className="h-4 w-4" /> },
                { id: 'database', label: 'DB & API Specs', icon: <Database className="h-4 w-4" /> },
                { id: 'challenges', label: 'Bug Stories', icon: <HelpCircle className="h-4 w-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-lg flex items-center space-x-1.5 transition-all ${
                    activeTab === tab.id
                      ? 'border-b-2 border-accent-purple text-accent-purple bg-accent-purple/5 font-extrabold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* TAB CONTENTS */}
            <div className="glass-card p-8 rounded-b-2xl min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* OVERVIEW TAB */}
                  {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                      <div className="md:col-span-8 space-y-6">
                        <div>
                          <h3 className="text-lg font-bold text-accent-purple mb-2">Business Problem</h3>
                          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                            {activeProject?.businessProblem}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-accent-blue mb-2">Technical Solution</h3>
                          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                            {activeProject?.solution}
                          </p>
                        </div>
                      </div>
                      <div className="md:col-span-4 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 p-6 rounded-xl h-fit">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Key Features</h3>
                        <ul className="space-y-3">
                          {activeProject?.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-xs">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="text-slate-700 dark:text-slate-300 leading-normal">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* ARCHITECTURE DIAGRAM TAB */}
                  {activeTab === 'architecture' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-accent-purple mb-4">System Components Topology</h3>
                      
                      {/* Interactive visual topology */}
                      <div className="w-full bg-slate-900/50 border border-white/5 rounded-2xl p-6 overflow-x-auto flex flex-col items-center">
                        <div className="flex space-x-8 min-w-[650px] justify-center items-center py-8">
                          {/* Client */}
                          <div className="p-4 bg-slate-800 border border-white/10 rounded-xl text-center shadow-lg w-28">
                            <span className="text-xs font-bold text-sky-400">React App</span>
                            <div className="text-[10px] text-slate-500 mt-1">Port 5173</div>
                          </div>

                          <div className="text-slate-600 font-bold">&rarr;</div>

                          {/* Gateway */}
                          <div className="p-4 bg-gradient-to-b from-indigo-900 to-indigo-950 border border-indigo-500/30 rounded-xl text-center shadow-lg w-32 relative">
                            <span className="text-xs font-bold text-accent-purple">API Gateway</span>
                            <div className="text-[9px] text-slate-400 mt-1">Edge Auth / Route</div>
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">JWT Check</div>
                          </div>

                          <div className="text-slate-600 font-bold">&rarr;</div>

                          {/* Discovery Registry */}
                          <div className="p-4 bg-slate-800 border border-white/10 rounded-xl text-center shadow-lg w-32">
                            <span className="text-xs font-bold text-slate-300">Eureka server</span>
                            <div className="text-[9px] text-slate-500 mt-1">Service Lookup</div>
                          </div>

                          <div className="text-slate-600 font-bold">&rarr;</div>

                          {/* Downstream Services */}
                          <div className="flex flex-col space-y-4">
                            <div className="p-3 bg-slate-950 border border-white/5 rounded-xl text-center shadow w-36 flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-200">Business Services</span>
                              <span className="text-[8px] bg-accent-purple/20 text-accent-purple px-1.5 py-0.5 rounded">H2/Postgres</span>
                            </div>
                            <div className="p-3 bg-slate-950 border border-white/5 rounded-xl text-center shadow w-36 flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-200">Notification Hub</span>
                              <span className="text-[8px] bg-accent-blue/20 text-accent-blue px-1.5 py-0.5 rounded">Kafka Queue</span>
                            </div>
                            <div className="p-3 bg-slate-950 border border-white/5 rounded-xl text-center shadow w-36 flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-200">Cache Layer</span>
                              <span className="text-[8px] bg-accent-cyan/20 text-accent-cyan px-1.5 py-0.5 rounded">Redis Cache</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                        *Downstream microservices run within a virtual private VPC network. The Edge Gateway represents the single exposed entrance checkpoint verifying asymmetric JSON Web Token credentials and routing calls via service paths registered inside the Eureka discovery server.
                      </p>
                    </div>
                  )}

                  {/* SEQUENCE DIAGRAM TAB */}
                  {activeTab === 'sequence' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-accent-purple mb-4">Event Flow & Transaction Sequence</h3>

                      <div className="w-full bg-slate-900/50 border border-white/5 rounded-2xl p-6 overflow-x-auto">
                        <div className="min-w-[600px] flex flex-col text-xs font-mono space-y-3 py-4 max-w-3xl mx-auto">
                          <div className="flex justify-between font-bold border-b border-white/5 pb-2 text-slate-400">
                            <span>Client Interface</span>
                            <span>Edge Gateway</span>
                            <span>Core Services</span>
                            <span>Databases</span>
                          </div>
                          
                          <div className="flex justify-between text-slate-300">
                            <span>1. Post login details ------------&gt;</span>
                            <span>Verifies bcrypt</span>
                            <span></span>
                            <span></span>
                          </div>
                          <div className="flex justify-between text-emerald-400">
                            <span>&lt;-- Returns JWT Token -------------</span>
                            <span>Creates session</span>
                            <span></span>
                            <span></span>
                          </div>
                          <div className="flex justify-between text-slate-300">
                            <span>2. Call GET /dashboard (with JWT) --&gt;</span>
                            <span>Checks signature</span>
                            <span>Checks cache hit</span>
                            <span></span>
                          </div>
                          <div className="flex justify-between text-indigo-400">
                            <span></span>
                            <span></span>
                            <span>[Cache Miss] ------------&gt;</span>
                            <span>Reads query</span>
                          </div>
                          <div className="flex justify-between text-cyan-400">
                            <span></span>
                            <span></span>
                            <span>Sets Redis Cache &lt;-----------</span>
                            <span>Returns record</span>
                          </div>
                          <div className="flex justify-between text-emerald-400">
                            <span>&lt;-- Returns dashboard data --------</span>
                            <span>Forwards payload</span>
                            <span>Sends aggregate</span>
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DATABASE & API REF TAB */}
                  {activeTab === 'database' && (
                    <div className="space-y-8">
                      {/* Database Schema */}
                      <div>
                        <h3 className="text-lg font-bold text-accent-rose mb-4 flex items-center space-x-1.5">
                          <Database className="h-5 w-5" />
                          <span>Normalized Database Entities</span>
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm border-collapse">
                            <thead>
                              <tr className="border-b border-slate-200 dark:border-white/5 text-slate-400">
                                <th className="py-3 pr-4 font-bold">Table Name</th>
                                <th className="py-3 px-4 font-bold">Column Specifications</th>
                                <th className="py-3 pl-4 font-bold">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {activeProject?.dbDesign.map((tbl, idx) => (
                                <tr key={idx} className="border-b border-slate-200 dark:border-white/5 text-xs">
                                  <td className="py-3.5 pr-4 font-semibold text-accent-purple">{tbl.table}</td>
                                  <td className="py-3.5 px-4 font-mono text-slate-300">{tbl.columns}</td>
                                  <td className="py-3.5 pl-4 text-slate-400">{tbl.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* API Documentation */}
                      <div>
                        <h3 className="text-lg font-bold text-accent-purple mb-4 flex items-center space-x-1.5">
                          <Server className="h-5 w-5" />
                          <span>REST Controller Endpoints</span>
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm border-collapse">
                            <thead>
                              <tr className="border-b border-slate-200 dark:border-white/5 text-slate-400">
                                <th className="py-3 pr-4 font-bold">Method</th>
                                <th className="py-3 px-4 font-bold">API Path</th>
                                <th className="py-3 px-4 font-bold">Description</th>
                                <th className="py-3 pl-4 font-bold">Auth Level</th>
                              </tr>
                            </thead>
                            <tbody>
                              {activeProject?.apiDocs.map((api, idx) => (
                                <tr key={idx} className="border-b border-slate-200 dark:border-white/5 text-xs">
                                  <td className="py-3.5 pr-4">
                                    <span className={`px-2 py-0.5 rounded font-bold ${
                                      api.method === 'GET' ? 'bg-blue-500/10 text-blue-400' :
                                      api.method === 'POST' ? 'bg-emerald-500/10 text-emerald-400' :
                                      'bg-amber-500/10 text-amber-400'
                                    }`}>
                                      {api.method}
                                    </span>
                                  </td>
                                  <td className="py-3.5 px-4 font-mono text-slate-300">{api.path}</td>
                                  <td className="py-3.5 px-4 text-slate-400">{api.desc}</td>
                                  <td className="py-3.5 pl-4 text-slate-400 font-semibold">{api.roles}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CHALLENGES & PERFORMANCE TAB */}
                  {activeTab === 'challenges' && (
                    <div className="space-y-8">
                      {/* Engineering Challenge */}
                      <div>
                        <h3 className="text-lg font-bold text-accent-rose mb-2">Real Bug Story & Debugging Walkthrough</h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          {activeProject?.challenges}
                        </p>
                      </div>

                      {/* Lesson Learned */}
                      <div>
                        <h3 className="text-lg font-bold text-accent-purple mb-2">Architectural Resolution</h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          {activeProject?.lessonsLearned}
                        </p>
                      </div>

                      {/* Performance & Security grids */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center space-x-1">
                            <Cpu className="h-4 w-4" />
                            <span>Performance Tuning</span>
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {activeProject?.performanceOptimizations}
                          </p>
                        </div>

                        <div className="p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-accent-purple mb-2 flex items-center space-x-1">
                            <Key className="h-4 w-4" />
                            <span>Security Measures</span>
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {activeProject?.securityFeatures}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
