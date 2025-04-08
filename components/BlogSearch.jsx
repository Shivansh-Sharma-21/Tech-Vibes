'use client';

import { useState, useEffect } from 'react';

export default function BlogSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const items = document.querySelectorAll('[data-search-item]');
    
    items.forEach(item => {
      const title = item.getAttribute('data-title') || '';
      const category = item.getAttribute('data-category') || '';
      const excerpt = item.getAttribute('data-excerpt') || '';
      
      const searchTermLower = searchTerm.toLowerCase();
      
      if (
        !searchTerm || 
        title.includes(searchTermLower) || 
        category.includes(searchTermLower) || 
        excerpt.includes(searchTermLower)
      ) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }, [searchTerm]);

  return (
    <div className="mb-10 backdrop-blur-sm bg-background/50 p-6 rounded-xl border border-border">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-muted-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input 
          type="search" 
          className="block w-full p-4 pl-10 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
          placeholder="Search articles..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
} 