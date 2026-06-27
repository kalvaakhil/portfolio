import React from 'react';
import { Download, Printer, Share2, Mail, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import api from '../services/api';

const Resume: React.FC = () => {

  const handleDownload = async () => {
    try {
      await api.post('/downloads/track', { fileType: 'PDF_RESUME' });
    } catch (err) {
      console.debug('Download tracking skipped:', err);
    }
    // actual download trigger
    window.open('https://github.com/kalvaakhil/Web-Dev/raw/main/FinanceMonitoring%20System/docs/RESUME_PROJECT_SUMMARY.md', '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link to CV copied to clipboard!');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
      {/* Action Buttons (Hidden on Print) */}
      <div className="flex flex-wrap justify-end gap-3 mb-8 no-print">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-accent-purple text-white text-xs font-bold uppercase rounded-lg hover:bg-accent-purple/90 flex items-center space-x-1.5 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Download PDF</span>
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-bold uppercase text-slate-300 hover:bg-white/5 flex items-center space-x-1.5 transition-colors"
        >
          <Printer className="h-4 w-4 text-slate-400" />
          <span>Print CV</span>
        </button>
        <button
          onClick={handleShare}
          className="px-4 py-2 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-bold uppercase text-slate-300 hover:bg-white/5 flex items-center space-x-1.5 transition-colors"
        >
          <Share2 className="h-4 w-4 text-slate-400" />
          <span>Share Link</span>
        </button>
      </div>

      {/* CV CONTAINER (Printable) */}
      <div className="glass-card p-10 rounded-3xl shadow-xl print-container text-slate-800 dark:text-slate-100 dark:bg-black/40">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 border-b border-slate-200 dark:border-white/5 pb-8 mb-8">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Akhil Kalva</h1>
            <p className="text-accent-purple font-semibold text-lg sm:text-xl mt-2">Java Full Stack Developer</p>
            <p className="text-slate-400 text-sm mt-1">Backend Engineer / Microservices Developer</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-y-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-accent-purple" />
              <a href="mailto:kalvaakhil.work@gmail.com" className="hover:underline">kalvaakhil.work@gmail.com</a>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-accent-purple" />
              <span>Hyderabad, India (Open to Relocation)</span>
            </div>
            <div className="flex items-center space-x-2">
              <GithubIcon className="h-4 w-4 text-accent-purple" />
              <a href="https://github.com/kalvaakhil" target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/kalvaakhil</a>
            </div>
            <div className="flex items-center space-x-2">
              <LinkedinIcon className="h-4 w-4 text-accent-purple" />
              <a href="https://linkedin.com/in/akhil-kalva" target="_blank" rel="noopener noreferrer" className="hover:underline">linkedin.com/in/akhil-kalva</a>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-bold border-b border-slate-200 dark:border-white/5 pb-2 mb-4 text-slate-800 dark:text-slate-100 flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-accent-purple" />
            <span>Professional Summary</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Java Full Stack Developer with 2+ years of experience designing and building high-performance backend systems, distributed microservices, and responsive user dashboards. Skilled in Spring Boot, Kafka messaging brokers, Redis caches, PostgreSQL, and React client interfaces. Highly focused on system security, circuit breaking limits, and database performance tunings.
          </p>
        </div>

        {/* Work Experience */}
        <div className="mb-8">
          <h2 className="text-xl font-bold border-b border-slate-200 dark:border-white/5 pb-2 mb-4 text-slate-800 dark:text-slate-100 flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-accent-purple" />
            <span>Work Experience</span>
          </h2>

          <div className="space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">Java Full Stack Developer</h3>
                <span className="text-xs text-slate-400 font-semibold">June 2024 – Present</span>
              </div>
              <p className="text-xs font-semibold text-accent-purple">Enterprise Tech Solutions | Hyderabad, India</p>
              <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-300 mt-3 space-y-2 leading-relaxed">
                <li>Architected and implemented enterprise microservices using Spring Boot, Spring Cloud Eureka, and Spring API Gateway, optimizing service resolution times by 35%.</li>
                <li>Designed and integrated Kafka event brokers to drive asynchronous email alerts and billing updates, reducing service coupling.</li>
                <li>Built premium dashboards in React, using TanStack Query, Framer Motion, and Tailwind CSS, resulting in a 40% enhancement in user retention.</li>
                <li>Introduced Redis caching layer with event-driven invalidation models, reducing backend read latency for reports from 800ms to 45ms.</li>
              </ul>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">Software Engineer Intern</h3>
                <span className="text-xs text-slate-400 font-semibold">Dec 2023 – May 2024</span>
              </div>
              <p className="text-xs font-semibold text-accent-purple">Core Solutions Corp | Chennai, India</p>
              <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-300 mt-3 space-y-2 leading-relaxed">
                <li>Developed RESTful controller endpoints using Spring MVC and Hibernate JPA to handle user profiles and role configurations.</li>
                <li>Implemented JWT authentication filters and security entry handlers, resolving key token-parsing vulnerabilities.</li>
                <li>Wrote 80+ backend integration and unit tests using JUnit 5 and Mockito, raising code coverage by 18%.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-8">
          <h2 className="text-xl font-bold border-b border-slate-200 dark:border-white/5 pb-2 mb-4 text-slate-800 dark:text-slate-100 flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-accent-purple" />
            <span>Education</span>
          </h2>
          <div>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">Bachelor of Engineering (B.E.) in Computer Science</h3>
              <span className="text-xs text-slate-400 font-semibold">2020 – 2024</span>
            </div>
            <p className="text-xs font-semibold text-accent-purple">Sathyabama Institute of Science and Technology | Chennai, India</p>
            <div className="flex items-center space-x-1.5 mt-2 font-bold text-xs text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full w-fit">
              <Award className="h-3 w-3" />
              <span>CGPA: 9.45 / 10</span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h2 className="text-xl font-bold border-b border-slate-200 dark:border-white/5 pb-2 mb-4 text-slate-800 dark:text-slate-100 flex items-center space-x-2">
            <Award className="h-5 w-5 text-accent-purple" />
            <span>Certifications & Credentials</span>
          </h2>
          <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300">
            <li className="flex items-center justify-between">
              <span><strong>AWS Certified Developer – Associate</strong> (Credential ID: AWS-DEV-ASSOC-999)</span>
              <span className="text-slate-500">Oct 2024</span>
            </li>
            <li className="flex items-center justify-between">
              <span><strong>Oracle Certified Professional: Java SE 17 Developer</strong> (Credential ID: OCP-JAVA-17-777)</span>
              <span className="text-slate-500">Mar 2024</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Resume;
