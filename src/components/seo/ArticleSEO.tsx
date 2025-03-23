
import React from 'react';
import { Helmet } from 'react-helmet';
import SEO from './SEO';
import StructuredData from './StructuredData';
import { generateArticleSchema, generateBreadcrumbSchema } from '../../utils/jsonLdData';
import BreadcrumbNav from '../navigation/BreadcrumbNav';

interface ArticleSEOProps {
  title: string;
  description: string;
  authorName: string;
  publishDate: string;
  modifiedDate?: string;
  featuredImage: string;
  category?: string;
  tags?: string[];
  slug: string;
  excerpt?: string;
  breadcrumbs: Array<{name: string, url: string}>;
}

const ArticleSEO: React.FC<ArticleSEOProps> = ({
  title,
  description,
  authorName,
  publishDate,
  modifiedDate,
  featuredImage,
  category,
  tags,
  slug,
  excerpt,
  breadcrumbs
}) => {
  // Generate article schema
  const articleSchema = generateArticleSchema({
    headline: title,
    description: excerpt || description,
    image: featuredImage,
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    authorName: authorName,
    publisherName: "AdvisorWiz",
    publisherLogo: "https://advisorwiz.com/lovable-uploads/d66162b8-d098-4ffe-a300-d14aa6ffe38e.png",
    url: `https://advisorwiz.com/${slug}`
  });
  
  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  
  // Combined structured data
  const structuredData = [articleSchema, breadcrumbSchema];
  
  // Format keywords from tags
  const keywordsString = tags?.join(', ') || '';

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={keywordsString}
        canonicalUrl={`https://advisorwiz.com/${slug}`}
        ogImage={featuredImage}
        ogType="article"
        articlePublishedTime={publishDate}
        articleModifiedTime={modifiedDate}
        author={authorName}
        pageUrl={`/${slug}`}
      />
      <StructuredData data={structuredData} />
      <Helmet>
        {/* Additional article-specific meta tags */}
        {category && <meta property="article:section" content={category} />}
        {tags?.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
      </Helmet>
      
      {/* Breadcrumb navigation */}
      <BreadcrumbNav items={breadcrumbs} />
    </>
  );
};

export default ArticleSEO;
