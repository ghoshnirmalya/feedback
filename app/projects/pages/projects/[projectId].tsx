import { Flex, Grid, Spinner } from "@chakra-ui/react";
import Layout from "app/layouts/Layout";
import LeftSidebar from "app/projects/components/LeftSidebar";
import RightSidebar from "app/projects/components/RightSidebar";
import { BlitzPage, dynamic } from "blitz";
import React, { Suspense } from "react";

const LazyContentArea = dynamic(
  () =>
    import(
      /* webpackChunkName: 'lazyContentArea' */ "app/projects/components/ContentArea"
    ),
  {
    ssr: false,
    loading: () => {
      return (
        <Flex
          h="calc(100vh - 50px)"
          w="calc(100vw - 300px)"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner />
        </Flex>
      );
    },
  }
);

const ShowProjectPage: BlitzPage = () => {
  return (
    <Flex flexDir="column">
      <Suspense fallback={<Spinner />}>
        <Grid templateColumns={["0.5fr 3fr 1fr"]} gap={8} w="100%">
          <LeftSidebar />
          <LazyContentArea />
          <RightSidebar />
        </Grid>
      </Suspense>
    </Flex>
  );
};

ShowProjectPage.getLayout = (page) => <Layout title={"Project"}>{page}</Layout>;

export default ShowProjectPage;
