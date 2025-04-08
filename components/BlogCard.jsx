'use client';

import Link from 'next/link';

export default function BlogCard({ slug, title }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group h-full flex flex-col hover-lift">
      <div className="h-40 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
        <svg 
          className="w-12 h-12 text-primary/40 group-hover:text-primary/60 transition-colors" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </h2>
        <p className="text-muted-foreground text-sm mb-4 flex-1">
          A fascinating look at {title.toLowerCase().replace(/-/g, ' ')}
        </p>
        <Link 
          href={`/blog/${slug}`}
          className="inline-flex items-center text-primary font-medium hover:underline mt-auto text-sm"
        >
          Read Article
          <svg 
            className="ml-1 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}