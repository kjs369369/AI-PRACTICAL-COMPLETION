import fs from "node:fs";
import path from "node:path";
import Head from "next/head";
import Script from "next/script";

const routes = {
  "": "index.html",
  "lectures/ai-practical-class-2-session-1": "lectures/ai-practical-class-2-session-1/index.html",
};

function extractBody(html) {
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return match ? match[1] : html;
}

function extractTitle(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return match ? match[1] : "Lecture Summary";
}

function extractMetaContent(html, key) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = html.match(
    new RegExp(
      `<meta[^>]+(?:name|property)=["']${escapedKey}["'][^>]+content=["']([^"']+)["']`,
      "i"
    )
  );
  return match?.[1] || "";
}

function extractCanonicalUrl(html) {
  const match = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
  );
  return match?.[1] || "";
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { path: [] } },
      { params: { path: ["lectures", "ai-practical-class-2-session-1"] } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const routeKey = (params?.path || []).join("/");
  const htmlPath = routes[routeKey];

  if (!htmlPath) {
    return { notFound: true };
  }

  const html = fs.readFileSync(path.join(process.cwd(), htmlPath), "utf8");

  return {
    props: {
      body: extractBody(html),
      title: extractTitle(html),
      metadata: {
        description: extractMetaContent(html, "description"),
        ogTitle: extractMetaContent(html, "og:title"),
        ogDescription: extractMetaContent(html, "og:description"),
        ogType: extractMetaContent(html, "og:type"),
        ogSiteName: extractMetaContent(html, "og:site_name"),
        ogLocale: extractMetaContent(html, "og:locale"),
        ogUrl: extractMetaContent(html, "og:url"),
        ogImage: extractMetaContent(html, "og:image"),
        ogImageWidth: extractMetaContent(html, "og:image:width"),
        ogImageHeight: extractMetaContent(html, "og:image:height"),
        ogImageAlt: extractMetaContent(html, "og:image:alt"),
        twitterCard: extractMetaContent(html, "twitter:card"),
        twitterTitle: extractMetaContent(html, "twitter:title"),
        twitterDescription: extractMetaContent(html, "twitter:description"),
        twitterImage: extractMetaContent(html, "twitter:image"),
        canonicalUrl: extractCanonicalUrl(html),
      },
    },
  };
}

export default function StaticPage({ body, title, metadata }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {metadata.description && (
          <meta name="description" content={metadata.description} />
        )}
        {metadata.ogTitle && (
          <meta property="og:title" content={metadata.ogTitle} />
        )}
        {metadata.ogDescription && (
          <meta property="og:description" content={metadata.ogDescription} />
        )}
        {metadata.ogType && (
          <meta property="og:type" content={metadata.ogType} />
        )}
        {metadata.ogSiteName && (
          <meta property="og:site_name" content={metadata.ogSiteName} />
        )}
        {metadata.ogLocale && (
          <meta property="og:locale" content={metadata.ogLocale} />
        )}
        {metadata.ogUrl && (
          <meta property="og:url" content={metadata.ogUrl} />
        )}
        {metadata.ogImage && (
          <meta property="og:image" content={metadata.ogImage} />
        )}
        {metadata.ogImageWidth && (
          <meta property="og:image:width" content={metadata.ogImageWidth} />
        )}
        {metadata.ogImageHeight && (
          <meta property="og:image:height" content={metadata.ogImageHeight} />
        )}
        {metadata.ogImageAlt && (
          <meta property="og:image:alt" content={metadata.ogImageAlt} />
        )}
        {metadata.twitterCard && (
          <meta name="twitter:card" content={metadata.twitterCard} />
        )}
        {metadata.twitterTitle && (
          <meta name="twitter:title" content={metadata.twitterTitle} />
        )}
        {metadata.twitterDescription && (
          <meta
            name="twitter:description"
            content={metadata.twitterDescription}
          />
        )}
        {metadata.twitterImage && (
          <meta name="twitter:image" content={metadata.twitterImage} />
        )}
        {metadata.canonicalUrl && (
          <link rel="canonical" href={metadata.canonicalUrl} />
        )}
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/theme.js" strategy="afterInteractive" />
    </>
  );
}
