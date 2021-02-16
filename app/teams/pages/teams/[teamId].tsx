import { Center, Container, Spinner, VStack } from "@chakra-ui/react";
import ProtectedLayout from "app/layouts/ProtectedLayout";
import { setCurrentUser } from "app/slices/currentUser";
import { wrapper } from "app/store";
import ProjectsList from "app/teams/components/ProjectsList";
import TeamHeading from "app/teams/components/TeamHeading";
import getCurrentUser from "app/users/queries/getCurrentUser";
import { BlitzPage, invokeWithMiddleware } from "blitz";
import React, { Suspense } from "react";

const ShowTeamPage: BlitzPage = () => {
  return (
    <Container maxW="2xl" centerContent p={8}>
      <Suspense
        fallback={
          <Center h="100vh">
            <Spinner />
          </Center>
        }
      >
        <VStack spacing={8} w="100%" align="left">
          <TeamHeading />
          <ProjectsList />
        </VStack>
      </Suspense>
    </Container>
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

ShowTeamPage.getLayout = (page) => (
  <ProtectedLayout title={"Team"}>{page}</ProtectedLayout>
);

export default ShowTeamPage;
