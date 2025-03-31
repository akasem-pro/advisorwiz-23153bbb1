
import React from 'react';
import { Helmet } from 'react-helmet';

interface SitemapLinkProps {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

interface SitemapProps {
  sitemapUrl: string;
  links?: SitemapLinkProps[];
}

/**
 * Component for adding sitemap information to the page head
 * This helps search engines discover and index your pages more efficiently
 */
const Sitemap: React.FC<SitemapProps> = ({ sitemapUrl, links }) => {
  // Default links for all main pages if not provided
  const defaultLinks: SitemapLinkProps[] = [
    { url: 'https://advisorwiz.com/' },
    { url: 'https://advisorwiz.com/about' },
    { url: 'https://advisorwiz.com/for-advisors' },
    { url: 'https://advisorwiz.com/for-consumers' },
    { url: 'https://advisorwiz.com/for-firms' },
    { url: 'https://advisorwiz.com/pricing' },
    { url: 'https://advisorwiz.com/privacy' },
    { url: 'https://advisorwiz.com/terms' },
    { url: 'https://advisorwiz.com/disclaimer' },
    { url: 'https://advisorwiz.com/cookies' },
    { url: 'https://advisorwiz.com/contact' },
    { url: 'https://advisorwiz.com/team' },
    { url: 'https://advisorwiz.com/blog' },
    { url: 'https://advisorwiz.com/careers' },
    { url: 'https://advisorwiz.com/resources' },
    { url: 'https://advisorwiz.com/download' },
    { url: 'https://advisorwiz.com/sitemap' },
  ];
  
  const sitemapLinks = links || defaultLinks;
  
  return (
    <Helmet>
      {/* Link to XML sitemap */}
      <link rel="sitemap" type="application/xml" href={sitemapUrl} />
      
      {/* Add individual page information with link tags */}
      {sitemapLinks.map((link, index) => (
        <link 
          key={index}
          rel="canonical" 
          href={link.url} 
          data-lastmod={link.lastModified}
          data-changefreq={link.changeFrequency}
          data-priority={link.priority}
        />
      ))}
    </Helmet>
  );
};

export default Sitemap;
