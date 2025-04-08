'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MotionDiv, MotionH1, MotionP } from '@/components/MotionWrapper';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-logo">TechVibes</div>
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  return (
    <>
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <MotionDiv
          className="flex flex-col items-center text-center space-y-6 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MotionH1
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            Welcome to TechVibes
          </MotionH1>
          
          <MotionP
            className="text-xl text-muted-foreground max-w-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            A modern blog about technology, programming, and the digital world.
          </MotionP>
          
          <MotionDiv
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-4"
          >
            <Link 
              href="/blog" 
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Explore Blog
            </Link>
          </MotionDiv>
        </MotionDiv>
        
        {/* Featured Categories */}
        <MotionDiv 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {['Latest Posts', 'Tech Insights', 'Tutorials'].map((item, i) => (
            <MotionDiv 
              key={item}
              className="p-6 rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm bg-background/50"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + (i * 0.1) }}
            >
              <h3 className="text-xl font-semibold mb-2">{item}</h3>
              <p className="text-muted-foreground">Explore our {item.toLowerCase()} and stay up to date with the latest trends.</p>
            </MotionDiv>
          ))}
        </MotionDiv>
        
        {/* About Section */}
        <MotionDiv
          className="py-16 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <MotionDiv
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, type: 'spring' }}
            >
              <h2 className="text-3xl font-bold mb-6">About TechVibes</h2>
              <p className="text-muted-foreground mb-4">
                TechVibes is your go-to destination for the latest in technology news, programming tutorials, and digital culture insights.
              </p>
              <p className="text-muted-foreground mb-4">
                Our mission is to deliver high-quality content that helps you stay ahead in the rapidly evolving tech landscape.
              </p>
              <MotionDiv
                className="mt-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/about" 
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Learn more about us
                  <svg 
                    className="ml-2 w-4 h-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </MotionDiv>
            </MotionDiv>
            
            <MotionDiv
              className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8 flex items-center justify-center backdrop-blur-sm"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, type: 'spring' }}
              style={{ height: '300px' }}
            >
              <svg 
                className="w-32 h-32 text-primary/60" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            </MotionDiv>
          </div>
        </MotionDiv>
        
        {/* Newsletter Section */}
        <MotionDiv
          className="py-16 px-8 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 text-center my-16 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter and never miss an update on the latest tech trends and insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <MotionDiv
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors w-full sm:w-auto">
                Subscribe
              </button>
            </MotionDiv>
          </div>
        </MotionDiv>
      </main>
    </>
  );
}
