
import React from 'react';
import { Helmet } from 'react-helmet';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  twitterCreator?: string;
  schema?: Record<string, any>;
  noIndex?: boolean;
  alternateLanguages?: {
    hrefLang: string;
    href: string;
  }[];
  pageUrl?: string;
  author?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl = 'https://advisorwiz.com',
  ogImage = '/og-image.png',
  ogType = 'website',
  articlePublishedTime,
  articleModifiedTime,
  twitterCreator = '@advisorwiz',
  schema,
  noIndex = false,
  alternateLanguages = [],
  pageUrl,
  author = 'AdvisorWiz',
}) => {
  const siteTitle = 'AdvisorWiz | Find Your Perfect Financial Advisor Match';
  const fullTitle = title ? `${title} | AdvisorWiz` : siteTitle;
  const actualCanonicalUrl = pageUrl ? `${canonicalUrl}${pageUrl}` : canonicalUrl;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={actualCanonicalUrl} />
      
      {/* Control search engine indexing */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={actualCanonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="AdvisorWiz" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph tags */}
      {articlePublishedTime && <meta property="article:published_time" content={articlePublishedTime} />}
      {articleModifiedTime && <meta property="article:modified_time" content={articleModifiedTime} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={actualCanonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      
      {/* Alternate language versions */}
      {alternateLanguages.map((lang) => (
        <link 
          key={lang.hrefLang} 
          rel="alternate" 
          hrefLang={lang.hrefLang} 
          href={lang.href} 
        />
      ))}
      
      {/* Additional SEO metadata */}
      <meta name="author" content={author} />
      <meta name="theme-color" content="#1E3A8A" />
      
      {/* Mobile viewport optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      
      {/* Page date information for search engines */}
      {articleModifiedTime && <meta name="lastmod" content={articleModifiedTime} />}
    </Helmet>
  );
};

export default SEO;
