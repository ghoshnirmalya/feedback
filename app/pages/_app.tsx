import AuthenticationForm from "app/auth/components/AuthenticationForm";
import { wrapper } from "app/store";
import {
  AppProps,
  AuthenticationError,
  AuthorizationError,
  ErrorComponent,
  useRouter,
} from "blitz";
import "focus-visible/dist/focus-visible";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { queryCache } from "react-query";

function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();

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
      <ErrorComponent
        statusCode={(error as any).statusCode}
        title="Sorry, you are not authorized to access this"
      />
    );
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error?.message || error?.name}
      />
    );
  }
}

export default wrapper.withRedux(App);
