
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
  return (
    <Helmet>
      {/* Link to XML sitemap */}
      <link rel="sitemap" type="application/xml" href={sitemapUrl} />
      
      {/* Add individual page information with link tags */}
      {links?.map((link, index) => (
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
