import { Html, Head, Main, NextScript } from 'next/document';
 
export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json"/>
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff"/>
        <meta property="og:image" content="/og_image.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}