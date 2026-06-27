import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, Mail, Award, Server, Database } from 'lucide-react';
import api from '../services/api';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  
  // Typing animation state
  const words = ["Java Full Stack Developer", "Backend Engineer", "Microservices Developer", "Spring Boot Expert", "Cloud Enthusiast"];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullWord = words[wordIndex];
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        if (currentText === fullWord) {
          // Pause before deleting
          setTypingSpeed(1500);
          setIsDeleting(true);
        } else {
          setTypingSpeed(100);
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(500);
        } else {
          setTypingSpeed(50);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, typingSpeed]);

  // Track resume download click
  const handleDownloadResume = async () => {
    try {
      await api.post('/downloads/track', { fileType: 'PDF_RESUME' });
    } catch (err) {
      console.debug('Failed to log resume download:', err);
    }
    // Perform actual download redirection (mock file for developer demo)
    window.open('https://github.com/kalvaakhil/Web-Dev/raw/main/FinanceMonitoring%20System/docs/RESUME_PROJECT_SUMMARY.md', '_blank');
  };

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)]">
      {/* Glow backgrounds */}
      <div className="glow-spot top-10 left-10"></div>
      <div className="glow-spot-cyan bottom-10 right-10"></div>
      <div className="absolute inset-0 bg-grid opacity-30 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col items-center justify-center text-center">
        {/* Availability Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 px-4 py-1.5 rounded-full border border-accent-purple/20 bg-accent-purple/5 text-accent-purple text-xs font-semibold uppercase tracking-wider flex items-center space-x-2"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Open for full-time backend and full-stack positions</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight"
        >
          Hello, I'm{' '}
          <span className="bg-gradient-to-r from-accent-purple via-accent-indigo to-accent-blue bg-clip-text text-transparent">
            Akhil Kalva
          </span>
        </motion.h1>

        {/* Typing Subheadline */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-10 sm:h-12 text-xl sm:text-2xl font-medium text-slate-400 dark:text-slate-400 mt-4 flex items-center justify-center"
        >
          <span>I'm a&nbsp;</span>
          <span className="text-accent-purple border-r-2 border-accent-purple pr-1 animate-pulse">
            {currentText}
          </span>
        </motion.div>

        {/* Short introduction */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl text-slate-600 dark:text-slate-300 sm:text-lg mt-6 leading-relaxed"
        >
          I design and implement high-performance, fault-tolerant Java backend systems, microservice architectures, and responsive SaaS interfaces. Specialized in Spring Boot, Kafka messaging, and Redis cache clusters.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-purple via-accent-indigo to-accent-blue text-white font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-accent-purple/20 hover:shadow-accent-purple/40 hover:scale-105 transition-all duration-300"
          >
            <Mail className="h-4 w-4" />
            <span>Hire Me / Contact</span>
          </Link>
          <button
            onClick={handleDownloadResume}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-accent-purple/40 bg-white/5 backdrop-blur-md font-semibold flex items-center justify-center space-x-2 hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300"
          >
            <Download className="h-4 w-4 text-accent-purple" />
            <span>Download Resume</span>
          </button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mt-20"
        >
          {/* Card 1 */}
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-accent-purple/10 rounded-xl text-accent-purple mb-4">
              <Award className="h-6 w-6" />
            </div>
            <span className="text-3xl font-extrabold bg-gradient-to-r from-accent-purple to-accent-indigo bg-clip-text text-transparent">2+ Years</span>
            <span className="text-xs text-slate-400 font-semibold uppercase mt-1 tracking-widest">Experience</span>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-accent-blue/10 rounded-xl text-accent-blue mb-4">
              <Server className="h-6 w-6" />
            </div>
            <span className="text-3xl font-extrabold bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">3 Major</span>
            <span className="text-xs text-slate-400 font-semibold uppercase mt-1 tracking-widest">Enterprise Projects</span>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-accent-rose/10 rounded-xl text-accent-rose mb-4">
              <Database className="h-6 w-6" />
            </div>
            <span className="text-3xl font-extrabold bg-gradient-to-r from-accent-rose to-accent-purple bg-clip-text text-transparent">9.45 / 10</span>
            <span className="text-xs text-slate-400 font-semibold uppercase mt-1 tracking-widest">CGPA (B.E. CSE)</span>
          </div>
        </motion.div>

        {/* Technology Highlights */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 max-w-4xl w-full text-center"
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-6">Expertise Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Java 21", "Spring Boot", "Spring Cloud", "Kafka", "Redis", "PostgreSQL", "React", "TypeScript", "Docker", "AWS"].map((tech) => (
              <span 
                key={tech} 
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
