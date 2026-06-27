import React from 'react';
import { Key, Cpu, Network, ShieldCheck, Zap } from 'lucide-react';

const SystemDesign: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-colors duration-300">
      <div className="glow-spot top-1/4 left-0"></div>
      <div className="glow-spot-cyan bottom-1/4 right-0"></div>
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">System Architecture Design</h1>
        <p className="text-slate-400 mt-4 sm:text-lg">
          Detailed blueprint of the distributed systems patterns applied throughout my projects.
        </p>
      </div>

      {/* Grid: 3 Pillars of Distributed Systems */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Gateway */}
        <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
          <div className="p-3 bg-accent-purple/10 text-accent-purple rounded-xl w-fit mb-6">
            <Key className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold mb-3">1. Edge Gateway Auth</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Perimeter guard architecture verifying asymmetrical RS256 signatures once at the gateway border. Bypasses downstream key request fanning by passing verified user-identity headers inside inner VPC bounds.
          </p>
          <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-accent-purple/10 to-transparent rounded-bl-full pointer-events-none"></div>
        </div>

        {/* Message Brokers */}
        <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
          <div className="p-3 bg-accent-blue/10 text-accent-blue rounded-xl w-fit mb-6">
            <Cpu className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold mb-3">2. Asynchronous Kafka Brokers</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Decoupled transactional pathways driven by Kafka topics. Heavy logging operations, notifications triggers, and Redis cache evictions run in background worker cycles, ensuring sub-100ms API response times.
          </p>
          <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-accent-blue/10 to-transparent rounded-bl-full pointer-events-none"></div>
        </div>

        {/* Caching Tiers */}
        <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
          <div className="p-3 bg-accent-cyan/10 text-accent-cyan rounded-xl w-fit mb-6">
            <Zap className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold mb-3">3. Cache-Aside Caching</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Multi-tiered caching utilizing Redis clusters for catalog fetches and reports. Caches are invalidated instantly via Kafka event updates, keeping metrics fresh while shielding backing databases from spikes.
          </p>
          <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-accent-cyan/10 to-transparent rounded-bl-full pointer-events-none"></div>
        </div>
      </div>

      {/* Observability Section */}
      <div className="glass-card p-8 rounded-2xl mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-accent-rose to-accent-purple bg-clip-text text-transparent flex items-center space-x-2">
            <Network className="h-6 w-6 text-accent-rose" />
            <span>Observability & Resilience Checks</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            A production-ready microservice requires robust telemetry. My systems implement Spring Boot Actuator exposes health, disk, and connection states to Prometheus. Micrometer aggregates raw metrics, fanning telemetry records to Grafana panels.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Resilience4j boundaries (retries, rate-limit boundaries, circuit breaks) are integrated into cross-service endpoints, preventing a slow downstream dependency from freezing upstream transaction pipelines.
          </p>
        </div>
        <div className="lg:col-span-5 bg-slate-900/50 border border-white/5 p-6 rounded-xl space-y-3 font-mono text-xs">
          <div className="text-slate-500">// Actuator telemetry metrics endpoint</div>
          <div className="flex justify-between text-slate-300 border-b border-white/5 pb-1">
            <span>GET /actuator/health</span>
            <span className="text-emerald-400 font-bold">{"{\"status\":\"UP\"}"}</span>
          </div>
          <div className="flex justify-between text-slate-300 border-b border-white/5 pb-1">
            <span>GET /actuator/prometheus</span>
            <span className="text-indigo-400"># HELP jvm_memory...</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>GET /api/admin/analytics</span>
            <span className="text-cyan-400">Aggregates view metrics</span>
          </div>
        </div>
      </div>

      {/* Cloud Architecture */}
      <div className="glass-card p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-accent-purple to-accent-indigo bg-clip-text text-transparent flex items-center space-x-2">
          <ShieldCheck className="h-6 w-6 text-accent-purple" />
          <span>CI/CD Pipeline & Cloud Deployment Blueprint</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-xs">
          <div className="p-4 bg-slate-900/50 border border-white/5 rounded-xl">
            <span className="font-bold text-accent-purple block mb-1">Commit code</span>
            <span className="text-slate-500">Triggers workflow on push events</span>
          </div>
          <div className="p-4 bg-slate-900/50 border border-white/5 rounded-xl">
            <span className="font-bold text-accent-blue block mb-1">GitHub Actions</span>
            <span className="text-slate-500">Compiles JARs & executes test runs</span>
          </div>
          <div className="p-4 bg-slate-900/50 border border-white/5 rounded-xl">
            <span className="font-bold text-accent-cyan block mb-1">Docker Packaging</span>
            <span className="text-slate-500">Wraps artifacts in isolated images</span>
          </div>
          <div className="p-4 bg-slate-900/50 border border-white/5 rounded-xl">
            <span className="font-bold text-accent-rose block mb-1">Cloud Registry</span>
            <span className="text-slate-500">Deploys to Railway, Render & AWS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemDesign;
