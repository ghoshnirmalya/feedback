import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import ProtectedLayout from "app/layouts/ProtectedLayout";
import { BlitzPage, dynamic } from "blitz";
import React, { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

const LazyContentArea = dynamic(
  () =>
    import(
      /* webpackChunkName: 'lazyContentArea' */ "app/projects/components/ContentArea"
    ),
  {
    ssr: false,
    loading: () => {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    },
  }
);

const LazyFilesSidebar = dynamic(
  () =>
    import(
      /* webpackChunkName: 'lazyFilesSidebar' */ "app/projects/components/FilesSidebar"
    ),
  {
    ssr: false,
    loading: () => {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    },
  }
);

const LazyDetailsSidebar = dynamic(
  () =>
    import(
      /* webpackChunkName: 'lazyDetailsSidebar' */ "app/projects/components/DetailsSidebar"
    ),
  {
    ssr: false,
    loading: () => {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    },
  }
);

const ShowProjectPage: BlitzPage = () => {
  useEffect(() => {
    // This is a hack to prevent overflow due to the accordion component
    document.body.style.overflow = "hidden";

    return function cleanup() {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <Flex flexDir="column" w="100%" h="calc(100vh - 80px)">
      <ErrorBoundary
        fallbackRender={({ error }) => {
          return (
            <Container maxW="6xl" centerContent p={8}>
              <Box p={8} bg="gray.100" rounded="md">
                <Text fontWeight="bold">{error.message}</Text>
              </Box>
            </Container>
          );
        }}
      >
        <Suspense fallback={<Spinner />}>
          <Grid templateColumns={["1fr 8fr 3fr"]} w="100%" h="100%">
            <LazyFilesSidebar />
            <LazyContentArea />
            <LazyDetailsSidebar />
          </Grid>
        </Suspense>
      </ErrorBoundary>
    </Flex>
  );
};

ShowProjectPage.getLayout = (page) => (
  <ProtectedLayout title={"Project"}>{page}</ProtectedLayout>
);

export default ShowProjectPage;
