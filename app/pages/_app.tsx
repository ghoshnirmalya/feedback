import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import LoginForm from "app/auth/components/LoginForm"
import Layout from "app/components/layouts"
import { wrapper } from "app/store"
import { AppProps, AuthenticationError, AuthorizationError, ErrorComponent, useRouter } from "blitz"
import "focus-visible/dist/focus-visible"
import { useEffect } from "react"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { queryCache } from "react-query"

function App({ Component, pageProps }: AppProps) {
  const isProduction = process.env.NODE_ENV === "production"
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  useEffect(() => {
    if (isProduction) {
      const gtag = require("app/lib/google-tag")

      const handleRouteChange = (url: URL) => {
        gtag.pageview(url)
      }

      router.events.on("routeChangeComplete", handleRouteChange)

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange)
      }
    }
  }, [router.events])

  const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
  }
  const customTheme = extendTheme({
    config,
    colors: {
      brand: {
        100: "#ffffff",
        200: "#bfbfbf",
        300: "#a6a6a6",
        400: "#8c8c8c",
        500: "#737373",
        600: "#595959",
        700: "#404040",
        800: "#262626",
        900: "#151515",
      },
    },
  })

  return (
    <ChakraProvider theme={customTheme}>
      <Layout>
        <ErrorBoundary
          FallbackComponent={RootErrorFallback}
          resetKeys={[router.asPath]}
          onReset={() => {
            // This ensures the Blitz useQuery hooks will automatically refetch
            // data any time you reset the error boundary
            queryCache.resetErrorBoundaries()
          }}
        >
          {getLayout(<Component {...pageProps} />)}
        </ErrorBoundary>
      </Layout>
    </ChakraProvider>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={(error as any).statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error?.message || error?.name}
      />
    )
  }
}

export default wrapper.withRedux(App)
