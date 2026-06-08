import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <script src="/theme.js" defer />
        <NextScript />
      </body>
    </Html>
  );
}
