import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Server, Layout, Database, Settings, ShieldCheck } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface SkillItem {
  name: string;
  proficiency: number;
  years: number;
  projects: string[];
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

const Skills: React.FC = () => {
  const { theme } = useTheme();

  const skillsData: SkillCategory[] = [
    {
      title: 'Backend Engineering',
      icon: <Server className="h-5 w-5 text-accent-purple" />,
      skills: [
        { name: 'Java 21', proficiency: 95, years: 3, projects: ['E-Commerce Platform', 'FinFlow', 'AI Job Search'] },
        { name: 'Spring Boot', proficiency: 92, years: 2, projects: ['E-Commerce Platform', 'FinFlow', 'AI Job Search'] },
        { name: 'Spring Cloud & Microservices', proficiency: 88, years: 2, projects: ['E-Commerce Platform', 'FinFlow'] },
        { name: 'Spring Security & OAuth2', proficiency: 85, years: 2, projects: ['E-Commerce Platform', 'FinFlow'] },
        { name: 'Apache Kafka', proficiency: 80, years: 1, projects: ['E-Commerce Platform', 'FinFlow'] },
        { name: 'Redis Caching', proficiency: 82, years: 2, projects: ['E-Commerce Platform', 'FinFlow'] }
      ]
    },
    {
      title: 'Frontend Development',
      icon: <Layout className="h-5 w-5 text-accent-blue" />,
      skills: [
        { name: 'React 18', proficiency: 85, years: 2, projects: ['E-Commerce Platform', 'FinFlow', 'AI Job Search'] },
        { name: 'TypeScript', proficiency: 80, years: 2, projects: ['FinFlow'] },
        { name: 'Tailwind CSS', proficiency: 90, years: 2, projects: ['E-Commerce Platform', 'FinFlow', 'AI Job Search'] },
        { name: 'Material UI & Recharts', proficiency: 82, years: 1, projects: ['E-Commerce Platform', 'FinFlow'] }
      ]
    },
    {
      title: 'Databases & Cloud',
      icon: <Database className="h-5 w-5 text-accent-cyan" />,
      skills: [
        { name: 'PostgreSQL', proficiency: 90, years: 3, projects: ['E-Commerce Platform', 'FinFlow', 'AI Job Search'] },
        { name: 'MySQL', proficiency: 90, years: 3, projects: ['Railway Management System'] },
        { name: 'AWS (EC2, S3, IAM)', proficiency: 80, years: 2, projects: ['E-Commerce Platform', 'FinFlow'] }
      ]
    },
    {
      title: 'DevOps & Testing',
      icon: <Settings className="h-5 w-5 text-accent-rose" />,
      skills: [
        { name: 'Docker & Compose', proficiency: 85, years: 2, projects: ['E-Commerce Platform', 'FinFlow'] },
        { name: 'GitHub Actions (CI/CD)', proficiency: 78, years: 1, projects: ['E-Commerce Platform', 'FinFlow'] },
        { name: 'JUnit & Mockito', proficiency: 85, years: 2, projects: ['E-Commerce Platform', 'FinFlow'] }
      ]
    }
  ];

  // Radar chart data representation
  const radarData = [
    { subject: 'Backend', A: 93, fullMark: 100 },
    { subject: 'Frontend', A: 84, fullMark: 100 },
    { subject: 'Databases', A: 90, fullMark: 100 },
    { subject: 'Cloud', A: 80, fullMark: 100 },
    { subject: 'DevOps', A: 82, fullMark: 100 },
    { subject: 'System Design', A: 88, fullMark: 100 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-colors duration-300">
      <div className="glow-spot top-10 left-10"></div>
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Skills & Tech Radar</h1>
        <p className="text-slate-400 mt-4 sm:text-lg">
          Quantitative rating of my coding competencies, tools, and practices.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        {/* Left Side: Recharts Radar */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center glass-card p-6 rounded-2xl h-[420px]">
          <h2 className="text-lg font-bold text-slate-200 mb-4 tracking-wider uppercase text-center w-full">Core Competency Radar</h2>
          <div className="w-full h-full max-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke={theme === 'dark' ? '#334155' : '#cbd5e1'} />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: theme === 'dark' ? '#94a3b8' : '#475569', fontSize: 12, fontWeight: 600 }} 
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fill: theme === 'dark' ? '#64748b' : '#94a3b8', fontSize: 10 }}
                />
                <Radar
                  name="Proficiency"
                  dataKey="A"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: Quick Highlights */}
        <div className="lg:col-span-7 glass-card p-8 rounded-2xl h-[420px] flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-accent-purple via-accent-indigo to-accent-blue bg-clip-text text-transparent">Design Philosophies</h2>
          <ul className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
            <li className="flex items-start space-x-3">
              <span className="p-1 bg-accent-purple/10 text-accent-purple rounded-md mt-0.5"><ShieldCheck className="h-4 w-4" /></span>
              <span><strong>Defensive Systems Integration:</strong> Applying retries, circuit breakers, fallback triggers, and fallback caching to preserve operation flow if downstream services crash.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="p-1 bg-accent-blue/10 text-accent-blue rounded-md mt-0.5"><ShieldCheck className="h-4 w-4" /></span>
              <span><strong>Event Sourcing & Transactions:</strong> Utilizing Kafka queues to process notifications or log evictions asynchronously, keeping API response times snappy.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="p-1 bg-accent-cyan/10 text-accent-cyan rounded-md mt-0.5"><ShieldCheck className="h-4 w-4" /></span>
              <span><strong>Data Representation decoupling:</strong> Creating dedicated MapStruct DTO layers to avoid circular JSON loops or lazy-loading Hibernate proxy crashes.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Skills Grid Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillsData.map((cat, idx) => (
          <div key={idx} className="glass-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3 mb-6 border-b border-slate-200 dark:border-white/5 pb-3">
              {cat.icon}
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{cat.title}</h2>
            </div>
            
            <div className="space-y-5">
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{skill.name}</span>
                    <span className="text-xs text-slate-400 font-semibold">{skill.years} Yrs Exp</span>
                  </div>
                  
                  {/* Slider bar */}
                  <div className="w-full bg-slate-200 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-accent-purple to-accent-indigo h-full rounded-full transition-all duration-1000"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                  
                  {/* Skill tags where used */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {skill.projects.map((proj) => (
                      <span key={proj} className="px-2 py-0.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded text-[10px] text-slate-500 dark:text-slate-400">
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
