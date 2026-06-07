import fs from "node:fs";
import path from "node:path";
import Head from "next/head";

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
    },
  };
}

export default function StaticPage({ body, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/styles.css" />
        <script src="/theme.js" defer />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
