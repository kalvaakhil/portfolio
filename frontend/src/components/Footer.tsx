import React from 'react';
import { Briefcase, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/20 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Logo & copyright */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-extrabold text-sm tracking-wider bg-gradient-to-r from-accent-purple to-accent-indigo bg-clip-text text-transparent">
              AKHIL KALVA
            </span>
            <p className="text-xs text-slate-400 mt-1">
              &copy; {new Date().getFullYear()} All rights reserved. Built with Spring Boot & React.
            </p>
          </div>

          {/* Availability badge */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-xs font-semibold uppercase tracking-wider animate-pulse">
            <Briefcase className="h-3.5 w-3.5" />
            <span>Available for Full-Time Roles (18–25+ LPA)</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/kalvaakhil"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-slate-200 dark:border-white/5 hover:border-accent-purple hover:text-accent-purple dark:text-slate-400 dark:hover:text-slate-100 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/akhil-reddy-kalva-a0213418b/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-slate-200 dark:border-white/5 hover:border-accent-purple hover:text-accent-purple dark:text-slate-400 dark:hover:text-slate-100 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href="mailto:kalvaakhilreddy080@gmail.com"
              className="p-2 rounded-full border border-slate-200 dark:border-white/5 hover:border-accent-purple hover:text-accent-purple dark:text-slate-400 dark:hover:text-slate-100 transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
