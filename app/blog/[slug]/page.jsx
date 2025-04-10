import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'posts'));

  return files.map(filename => ({
    slug: filename.replace('.md', '')
  }));
}

// Function to get all posts
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
      excerpt: matterResult.data.excerpt || "",
    };
  });
  
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Estimate reading time
function estimateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Process markdown content to HTML using remark/rehype
async function processMarkdown(content) {
  const result = await unified()
    .use(remarkParse) // Parse markdown
    .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML
    .use(rehypeSlug) // Add IDs to headings
    .use(rehypeStringify, { allowDangerousHtml: true }) // Stringify HTML
    .process(content);
    
  return result.toString();
}

export default async function PostPage({ params }) {
  console.log("Rendering post for slug:", params.slug);
  const filePath = path.join(process.cwd(), 'posts', `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content: markdownContent } = matter(fileContent);
  console.log("Post frontmatter:", data);
  
  // Process markdown to HTML
  const htmlContent = await processMarkdown(markdownContent);
  
  // Calculate reading time
  const readingTime = estimateReadingTime(markdownContent);
  
  // Get related posts (same category)
  const allPosts = getPostMetadata();
  
  const relatedPosts = allPosts
    .filter(post => post.category === data.category && post.slug !== params.slug)
    .slice(0, 3);
  
  // Format date for display
  const formattedDate = data.date ? new Date(data.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';
  
  return (
    <div className="animate-fadeIn">
      {/* Hero section with title and metadata */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="space-y-3 sm:space-y-4">
            {data.category && (
              <div className="inline-block px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                {data.category}
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold animate-slideUp">
              {data.title || params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-muted-foreground text-sm sm:text-base">
              {formattedDate && (
                <div className="flex items-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formattedDate}
                </div>
              )}
              
              <div className="flex items-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readingTime} min read
              </div>
              
              {data.author && (
                <div className="flex items-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {data.author}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Article content - main */}
        <main className="col-span-12">
          <article className="prose prose-sm sm:prose prose-lg dark:prose-invert max-w-none">
            <div 
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </article>
          
          {/* Tags */}
          {data.tags && (
            <div className="mt-8 sm:mt-10 pt-6 border-t border-border">
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {data.tags.split(',').map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full bg-secondary/50 text-secondary-foreground"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Author box */}
          {data.author && data.authorBio && (
            <div className="mt-8 sm:mt-10 p-4 sm:p-6 rounded-xl border border-border bg-background/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">{data.author}</h3>
                  {data.authorBio && <p className="text-sm sm:text-base text-muted-foreground">{data.authorBio}</p>}
                </div>
              </div>
            </div>
          )}
          
          {/* Related posts section - always show, with fallback message if none */}
          <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-border">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Related Posts</h3>
            {relatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {relatedPosts.map((post) => (
                  <Link 
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group"
                  >
                    <div className="border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group-hover:-translate-y-1 bg-background/50 backdrop-blur-sm h-full">
                      <div className="h-24 sm:h-32 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 flex items-center justify-center">
                        <svg 
                          className="w-8 h-8 sm:w-10 sm:h-10 text-primary/60 group-hover:text-primary/80 transition-colors" 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium">
                            {post.category}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-md font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h4>
                        {post.excerpt && (
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-secondary/20 rounded-lg p-6 text-center">
                <p className="text-muted-foreground">No related posts in the "{data.category}" category yet.</p>
                <Link href="/blog" className="inline-block mt-3 text-primary hover:underline">
                  Browse all posts
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Back to blog button */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 border-t border-border">
        <Link 
          href="/blog" 
          className="text-primary hover:underline inline-flex items-center text-sm sm:text-base"
        >
          <svg 
            className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to all posts
        </Link>
      </div>
      
      {/* Script to handle smooth scrolling for anchor links */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
          // Get all links with hash
          const hashLinks = document.querySelectorAll('a[href^="#"]');
          
          // Add click event to each link
          hashLinks.forEach(link => {
            link.addEventListener('click', function(e) {
              e.preventDefault();
              
              // Get the target element
              const targetId = this.getAttribute('href').substring(1);
              const targetElement = document.getElementById(targetId);
              
              if (targetElement) {
                // Scroll to the element with smooth behavior
                window.scrollTo({
                  top: targetElement.offsetTop - 80, // Offset for header or padding
                  behavior: 'smooth'
                });
                
                // Update URL hash without scrolling (optional)
                history.pushState(null, null, this.getAttribute('href'));
                
                // Add a temporary highlight to the target heading
                targetElement.classList.add('highlight-heading');
                setTimeout(() => {
                  targetElement.classList.remove('highlight-heading');
                }, 2000);
              }
            });
          });
          
          // Also handle direct hash links on page load
          if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
              // Slight delay to ensure page is fully loaded
              setTimeout(() => {
                window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
                });
              }, 100);
            }
          }
        });
      `}} />
    </div>
  );
}
