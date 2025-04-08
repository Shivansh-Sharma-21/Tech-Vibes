import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import BlogSearch from '@/components/BlogSearch';

// Get post metadata from MD files (server-side only)
function getPostMetadata() {
  const folder = "posts/";
  const files = fs.readdirSync(folder);
  
  const markdownPosts = files.filter((file) => file.endsWith(".md"));
  
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`${folder}${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    
    return {
      title: matterResult.data.title || fileName.replace(".md", "").split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
      date: matterResult.data.date || new Date().toISOString(),
      category: matterResult.data.category || "Technology",
      slug: fileName.replace(".md", ""),
      excerpt: matterResult.data.excerpt || `A fascinating look at ${fileName.replace('.md', '').replace(/-/g, ' ')}`
    };
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default function BlogPage() {
  const posts = getPostMetadata();
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 mb-4">
          Blog Posts
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover insights, tutorials, and the latest in technology
        </p>
      </div>
      
      {/* Client-side search component */}
      <BlogSearch />
      
      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div 
            key={post.slug}
            data-search-item
            data-title={post.title.toLowerCase()}
            data-category={post.category.toLowerCase()}
            data-excerpt={post.excerpt ? post.excerpt.toLowerCase() : ''}
            className="border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group hover:-translate-y-1 bg-background/50 backdrop-blur-sm"
          >
            <div className="h-48 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
              <svg 
                className="w-16 h-16 text-primary/40 group-hover:text-primary/60 transition-colors" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(post.date)}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <Link 
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                Read Article
                <svg 
                  className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" 
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
        ))}
      </div>
    </div>
  );
}