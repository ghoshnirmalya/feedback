import { Button, Center } from "@chakra-ui/react";
import AuthenticationForm from "app/auth/components/AuthenticationForm";
import ErrorState from "app/components/ErrorState";
import PublicLayout from "app/layouts/PublicLayout";
import { wrapper } from "app/store";
import {
  AppProps,
  AuthenticationError,
  AuthorizationError,
  Link,
  useRouter,
} from "blitz";
import "focus-visible/dist/focus-visible";
import React, { useEffect } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { queryCache } from "react-query";
import isProduction from "utils/isProduction";

function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();

  useEffect(() => {
    if (isProduction) {
      const gtag = require("integrations/googleAnalytics");
      const handleRouteChange = (url: URL) => {
        gtag.pageview(url);
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      resetKeys={[router.asPath]}
      onReset={() => {
        // This ensures the Blitz useQuery hooks will automatically refetch
        // data any time you reset the error boundary
        queryCache.resetErrorBoundaries();
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  );
}

function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error instanceof AuthenticationError) {
    return <AuthenticationForm />;
  } else if (error instanceof AuthorizationError) {
    return (
      <PublicLayout>
        <ErrorState
          heading={error?.message || error?.name}
          text="Sorry, you are not authorized to access this"
          icon="/illustrations/Online protection_Monochromatic.svg"
          buttons={[
            <Link href="/auth" passHref key="authButton">
              <Button colorScheme="yellow" type="submit" size="lg">
                Go to the login page
              </Button>
            </Link>,
          ]}
        />
      </PublicLayout>
    );
  } else {
    return (
      <PublicLayout>
        <Center h="100vh" w="100%">
          <ErrorState
            heading={error?.message || error?.name}
            text={
              (error as any)?.statusCode
                ? `An error ${(error as any)?.statusCode} occurred on server`
                : "An error occurred on client"
            }
            icon="/illustrations/Online protection_Monochromatic.svg"
            buttons={[
              <Link href="/auth" passHref key="authButton">
                <Button colorScheme="yellow" type="submit" size="lg">
                  Go to the login page
                </Button>
              </Link>,
            ]}
          />
        </Center>
      </PublicLayout>
    );
  }
}

export default wrapper.withRedux(App);
