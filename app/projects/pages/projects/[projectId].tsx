import { Center, Flex, Grid, Spinner } from "@chakra-ui/react";
import AnonymousLayout from "app/layouts/AnonymousLayout";
import { setCurrentUser } from "app/slices/currentUser";
import { wrapper } from "app/store";
import getCurrentUser from "app/users/queries/getCurrentUser";
import { BlitzPage, dynamic, invokeWithMiddleware } from "blitz";
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
      /* webpackChunkName: 'lazyDetailsSidebar' */ "app/projects/components/DetailsSidebar/DetailsSidebar"
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
      <Suspense
        fallback={
          <Center h="100vh">
            <Spinner />
          </Center>
        }
      >
        <Grid templateColumns={["1fr 8fr 3fr"]} w="100%" h="100%">
          <LazyFilesSidebar />
          <LazyContentArea />
          <LazyDetailsSidebar />
        </Grid>
      </Suspense>
    </Flex>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req, res }) => {
    const currentUser = await invokeWithMiddleware(getCurrentUser, null, {
      req,
      res,
    });

    store.dispatch(setCurrentUser(currentUser));

    return {
      props: {},
    };
  }
);

ShowProjectPage.getLayout = (page) => (
  <AnonymousLayout title={"Project"}>{page}</AnonymousLayout>
);

export default ShowProjectPage;
