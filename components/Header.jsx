'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MotionDiv } from '@/components/MotionWrapper';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const hamburgerButton = document.getElementById('hamburger-button');
      
      if (
        menuOpen && 
        mobileMenu && 
        hamburgerButton && 
        !mobileMenu.contains(e.target) && 
        !hamburgerButton.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 animate-slideDown backdrop-blur-sm ${
        scrolled ? 'bg-background/90 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
          <Link href="/" className="font-bold text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
            TechVibes
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item, i) => (
            <div
              key={item.name}
              className="animate-fadeIn hover:-translate-y-1 transition-transform"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Link 
                href={item.path}
                className="text-foreground/80 hover:text-foreground font-medium transition-colors"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            id="hamburger-button"
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className={`w-6 flex flex-col items-end justify-center gap-1.5 transition-all duration-300 ${menuOpen ? 'gap-0.5' : 'gap-1.5'}`}>
              <span 
                className={`block h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'w-6 translate-y-1 rotate-55' : 'w-6'}`} 
              />
              <span 
                className={`block h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-4'}`}
              />
              <span 
                className={`block h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'w-6 -translate-y-3 -rotate-55' : 'w-6'}`}
              />
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <MotionDiv
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          id="mobile-menu"
          className="absolute top-full left-0 right-0 bg-background/100 backdrop-blur-md shadow-lg rounded-b-xl overflow-hidden md:hidden border-t border-border"
        >
          <div className="flex flex-col p-4">
            {navItems.map((item, i) => (
              <MotionDiv
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="py-3 border-b border-border last:border-b-0"
              >
                <Link 
                  href={item.path}
                  className="text-foreground font-medium block w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </MotionDiv>
            ))}
            
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 pt-4 flex justify-center space-x-4 border-t border-border"
            >
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-muted-foreground/10 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-muted-foreground/10 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-muted-foreground/10 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>
            </MotionDiv>
            
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <Link 
                href="/blog" 
                onClick={() => setMenuOpen(false)}
                className="w-full block text-center py-3 px-4 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Explore Blog
              </Link>
            </MotionDiv>
          </div>
        </MotionDiv>
      )}
    </header>
  );
} 