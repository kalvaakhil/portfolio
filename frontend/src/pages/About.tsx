import React from 'react';
import { Award, GraduationCap, Compass, Eye, Heart } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      title: 'Scalability & Performance',
      desc: 'Writing highly performant SQL queries, caching expensive calls, and designing stateless services to scale horizontally.',
      icon: <Compass className="h-6 w-6 text-accent-purple" />
    },
    {
      title: 'Clean Code & Robust Testing',
      desc: 'Adhering to SOLID principles, writing descriptive self-documenting code, and maintaining high coverage via unit/integration tests.',
      icon: <Heart className="h-6 w-6 text-accent-rose" />
    },
    {
      title: 'Distributed Architecture',
      desc: 'Utilizing asynchronous brokers (Kafka) to de-clutter core checkout paths and structure event-driven communications.',
      icon: <Eye className="h-6 w-6 text-accent-blue" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-colors duration-300">
      <div className="glow-spot top-1/4 right-0"></div>
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">About Me</h1>
        <p className="text-slate-400 mt-4 sm:text-lg">
          Bridging technical architectural design with premium user experiences.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Career Story */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-accent-purple to-accent-indigo bg-clip-text text-transparent">My Professional Story</h2>
            <div className="text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
              <p>
                I am a Java Full Stack Developer with 2+ years of software design experience. My focus lies in architecting microservices, constructing distributed event pipelines, and building state-of-the-art web dashboards.
              </p>
              <p>
                My engineering journey began with Java core and Spring frameworks during my academic years at Sathyabama Institute of Science and Technology. I have successfully scaled checkouts, implemented JWT refresh-token rotation chains, and handled lazy-loading JPA serialization bottlenecks.
              </p>
              <p>
                I view code not just as logic, but as the backbone of a business. That is why I spend time researching distributed systems design, microservice patterns, rate limiters, and caching fallbacks to make sure the platform stays up no matter the load.
              </p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">Academic Background</h2>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-accent-blue/10 rounded-xl text-accent-blue">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Bachelor of Engineering (B.E.)</h3>
                <p className="text-sm font-semibold text-slate-400">Computer Science and Engineering</p>
                <p className="text-sm text-slate-500 mt-1">Sathyabama Institute of Science and Technology (2020 – 2024)</p>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-bold mt-3">
                  <Award className="h-3 w-3" />
                  <span>CGPA: 9.45 / 10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Goals & Values */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-accent-rose to-accent-purple bg-clip-text text-transparent">Engineering Core Values</h2>
            <div className="space-y-6">
              {values.map((v, idx) => (
                <div key={idx} className="flex space-x-4">
                  <div className="p-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl h-fit">
                    {v.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">{v.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl bg-gradient-to-r from-accent-purple/5 to-accent-indigo/5 border-accent-purple/20">
            <h2 className="text-xl font-bold mb-3 text-slate-100">Now Learning & Exploring</h2>
            <ul className="text-sm text-slate-300 space-y-2">
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-purple"></span>
                <span>Kubernetes orchestration & Helm charts</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-purple"></span>
                <span>Istio Service Mesh configurations</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-purple"></span>
                <span>OpenTelemetry and distributed tracing logs</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
