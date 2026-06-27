import React from 'react';
import { MapPin, Star, Trophy, ArrowUpRight } from 'lucide-react';

interface TimelineEvent {
  year: string;
  role: string;
  company: string;
  location: string;
  description: string[];
  tech: string[];
}

const Experience: React.FC = () => {
  const experiences: TimelineEvent[] = [
    {
      year: '2024 – Present',
      role: 'Java Full Stack Developer',
      company: 'Enterprise Tech Solutions',
      location: 'Hyderabad, India',
      description: [
        'Architected and implemented enterprise microservices using Spring Boot, Spring Cloud Eureka, and Spring API Gateway, optimizing service resolution times by 35%.',
        'Designed and integrated Kafka event brokers to drive asynchronous email alerts and billing updates, reducing service coupling.',
        'Built premium dashboards in React, using TanStack Query, Framer Motion, and Tailwind CSS, resulting in a 40% enhancement in user retention.',
        'Introduced Redis caching layer with event-driven invalidation models, reducing backend read latency for reports from 800ms to 45ms.'
      ],
      tech: ['Java 21', 'Spring Boot', 'Spring Cloud', 'Kafka', 'Redis', 'React', 'Docker', 'PostgreSQL']
    },
    {
      year: '2023 – 2024',
      role: 'Software Engineer Intern',
      company: 'Core Solutions Corp',
      location: 'Chennai, India',
      description: [
        'Developed RESTful controller endpoints using Spring MVC and Hibernate JPA to handle user profiles and role configurations.',
        'Implemented JWT authentication filters and security entry handlers, resolving key token-parsing vulnerabilities.',
        'Wrote 80+ backend integration and unit tests using JUnit 5 and Mockito, raising code coverage by 18%.'
      ],
      tech: ['Java 17', 'Spring Boot', 'Spring MVC', 'Hibernate', 'MySQL', 'JUnit', 'Mockito']
    }
  ];

  const certifications = [
    {
      name: 'AWS Certified Developer – Associate',
      issuer: 'Amazon Web Services (AWS)',
      date: 'October 2024',
      id: 'AWS-DEV-ASSOC-999',
      link: 'https://aws.amazon.com/verification'
    },
    {
      name: 'Oracle Certified Professional: Java SE 17 Developer',
      issuer: 'Oracle',
      date: 'March 2024',
      id: 'OCP-JAVA-17-777',
      link: 'https://education.oracle.com'
    }
  ];

  const achievements = [
    {
      title: 'First Place - Sathyabama Hackathon',
      desc: 'Led a team of 4 to build a distributed disaster-alerting prototype using WebSocket and Java, winning 1st place out of 60 competing teams.',
      date: 'November 2023'
    },
    {
      title: 'Academic Excellence Award',
      desc: 'Maintained an overall CGPA of 9.45/10, ranking in the top 3% of the Computer Science branch.',
      date: 'May 2024'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-colors duration-300">
      <div className="glow-spot top-1/4 right-0"></div>
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Experience & Accolades</h1>
        <p className="text-slate-400 mt-4 sm:text-lg">
          My professional history, AWS/Oracle certifications, and academic achievements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <h2 className="text-xl font-bold text-slate-200 border-b border-white/5 pb-2">Career Timeline</h2>
          
          <div className="relative border-l-2 border-accent-purple/20 ml-4 pl-8 space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-12 top-1 h-8 w-8 rounded-full bg-darkBg border-2 border-accent-purple flex items-center justify-center text-accent-purple font-bold text-xs shadow-md shadow-accent-purple/20">
                  <Star className="h-3.5 w-3.5" />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <span className="px-2.5 py-1 rounded bg-accent-purple/10 text-accent-purple text-xs font-semibold uppercase tracking-wider">
                      {exp.year}
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center space-x-1 mt-1 sm:mt-0">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{exp.location}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
                  <p className="text-xs font-semibold text-slate-400">{exp.company}</p>
                  
                  <ul className="list-disc pl-5 text-xs text-slate-400 space-y-1.5 pt-2 leading-relaxed">
                    {exp.description.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {exp.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Certs & Achievements (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Certifications */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-200 border-b border-white/5 pb-2">Certifications</h2>
            
            <div className="space-y-4">
              {certifications.map((cert, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-200 leading-snug">{cert.name}</h3>
                    <p className="text-[11px] text-slate-500 font-semibold mt-1">{cert.issuer} &bull; {cert.date}</p>
                    <div className="text-[10px] font-mono text-slate-400 mt-2 bg-white/5 px-2.5 py-0.5 rounded w-fit">
                      ID: {cert.id}
                    </div>
                  </div>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold uppercase text-accent-purple hover:underline mt-4 flex items-center space-x-1 self-end"
                  >
                    <span>Verify Credentials</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-200 border-b border-white/5 pb-2">Key Accomplishments</h2>
            
            <div className="space-y-4">
              {achievements.map((ach, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl flex space-x-4">
                  <div className="p-2.5 bg-accent-rose/10 text-accent-rose rounded-xl h-fit">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-200 leading-snug">{ach.title}</h3>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{ach.date}</p>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
