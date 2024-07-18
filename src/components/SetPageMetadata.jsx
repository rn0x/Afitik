import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Set page metadata including title, description, keywords, Open Graph tags, canonical URL,
 * content language, author, analytics keywords, pagination URLs, and structured data.
 * @param {Object} metadata - Metadata object containing page information.
 * @param {string} metadata.title - Page title.
 * @param {string} metadata.description - Page description.
 * @param {string} metadata.keywords - Keywords related to the page.
 * @param {string} metadata.ogImage - URL of the Open Graph image.
 * @param {string} metadata.canonicalUrl - Canonical URL for the page.
 * @param {string} metadata.contentLanguage - Language code for the page content.
 * @param {string} metadata.author - Author or creator of the page content.
 * @param {string} metadata.analyticsKeywords - Keywords for analytics purposes.
 * @param {string} metadata.nextUrl - URL of the next page (for pagination).
 * @param {string} metadata.prevUrl - URL of the previous page (for pagination).
 * @param {Object} metadata.structuredData - Structured data object conforming to JSON-LD format.
 * @returns {JSX.Element} Helmet component with metadata tags.
 */
export default function SetPageMetadata({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
  contentLanguage,
  author,
  analyticsKeywords,
  nextUrl,
  prevUrl,
  structuredData
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {contentLanguage && <meta http-equiv="Content-Language" content={contentLanguage} />}
      {author && <meta name="author" content={author} />}
      {analyticsKeywords && <meta name="analytics-keywords" content={analyticsKeywords} />}
      {nextUrl && <link rel="next" href={nextUrl} />}
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}