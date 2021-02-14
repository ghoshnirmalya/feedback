import { BlitzScript, DocumentHead, Main, Html, Document } from "blitz";
import { Head } from "next/document";
import isProduction from "utils/isProduction";

class MyDocument extends Document {
  googleAnalyticsScriptNode = () => {
    if (!isProduction) {
      return false;
    }

    return (
      <>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
          }}
        />
      </>
    );
  };

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="Description"
            content="Collect feedback for your designs."
          />
          {this.googleAnalyticsScriptNode()}
        </Head>
        <DocumentHead />
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
