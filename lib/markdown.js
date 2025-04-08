import matter from 'gray-matter';
import { marked } from 'marked';

export function parseMarkdown(fileContent) {
  const { data, content } = matter(fileContent);
  const html = marked(content);
  return { data, html };
}