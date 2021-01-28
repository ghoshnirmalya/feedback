import { Center, Flex, Grid, Spinner } from "@chakra-ui/react";
import Layout from "app/layouts/Layout";
import { BlitzPage, dynamic } from "blitz";
import React, { Suspense, useEffect } from "react";

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

const LazyLeftSidebar = dynamic(
  () =>
    import(
      /* webpackChunkName: 'lazyLeftSidebar' */ "app/projects/components/LeftSidebar"
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

const LazyRightSidebar = dynamic(
  () =>
    import(
      /* webpackChunkName: 'lazyRightSidebar' */ "app/projects/components/RightSidebar"
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
      <Suspense fallback={<Spinner />}>
        <Grid templateColumns={["1fr 6fr 2fr"]} gap={8} w="100%" h="100%">
          <LazyLeftSidebar />
          <LazyContentArea />
          <LazyRightSidebar />
        </Grid>
      </Suspense>
    </Flex>
  );
};

ShowProjectPage.getLayout = (page) => <Layout title={"Project"}>{page}</Layout>;

export default ShowProjectPage;
