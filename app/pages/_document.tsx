import { BlitzScript /*DocumentContext*/, Document, DocumentHead, Html, Main, Head } from "blitz"
import { Box } from "@chakra-ui/react"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  googleAnalyticsScriptNode = () => {
    const isProduction = process.env.NODE_ENV === "production"

    if (!isProduction) {
      return false
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
    )
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {this.googleAnalyticsScriptNode()}
          <meta name="Description" content="Website builder" />
        </Head>
        <DocumentHead />
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
