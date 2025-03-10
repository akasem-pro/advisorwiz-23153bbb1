
import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
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
}) => {
  const siteTitle = 'AdvisorWiz | Find Your Perfect Financial Advisor Match';
  const fullTitle = title ? `${title} | AdvisorWiz` : siteTitle;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Control search engine indexing */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
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
      <meta name="twitter:url" content={canonicalUrl} />
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
      
      {/* Mobile viewport optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      
      {/* Additional SEO tags */}
      <meta name="author" content="AdvisorWiz" />
      <meta name="theme-color" content="#1E3A8A" />
    </Helmet>
  );
};

export default SEO;
