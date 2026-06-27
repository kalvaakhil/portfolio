import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Sun, Moon, Terminal, ShieldAlert, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'System Design', path: '/system-design' },
    { name: 'Resume', path: '/resume' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-panel shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-accent-purple to-accent-indigo rounded-lg text-white">
              <Terminal className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-accent-purple via-accent-indigo to-accent-blue bg-clip-text text-transparent">
              AKHIL.DEV
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-accent-purple bg-accent-purple/10 font-semibold'
                    : 'text-slate-500 hover:text-accent-purple dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10 mx-2"></div>

            {/* Admin Dashboard */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  className="px-3 py-2 rounded-md text-sm font-medium text-emerald-500 hover:bg-emerald-500/10 flex items-center space-x-1"
                >
                  <ShieldAlert className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-rose-500 hover:bg-rose-500/10 flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                className="px-3 py-2 rounded-md text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-100 transition-colors"
              >
                Admin
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-colors ml-2"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Main menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-slate-200 dark:border-white/10 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? 'text-accent-purple bg-accent-purple/10 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-accent-purple dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex justify-between">
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 text-emerald-500 flex items-center space-x-1"
              >
                <ShieldAlert className="h-4 w-4" />
                <span>Admin Panel</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="px-3 py-2 text-rose-500 flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-slate-400 hover:text-white"
            >
              Admin Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
