import { Center, Container, Spinner, VStack } from "@chakra-ui/react";
import ProtectedLayout from "app/layouts/ProtectedLayout";
import { setCurrentUser } from "app/slices/currentUser";
import { wrapper } from "app/store";
import CreateTeamForm from "app/teams/components/CreateTeamForm";
import CreateTeamHeading from "app/teams/components/CreateTeamHeading";
import getCurrentUser from "app/users/queries/getCurrentUser";
import { BlitzPage, invokeWithMiddleware } from "blitz";
import React, { Suspense } from "react";

const NewTeamPage: BlitzPage = () => {
  return (
    <Container maxW="2xl" p={8}>
      <Suspense
        fallback={
          <Center h="100vh">
            <Spinner />
          </Center>
        }
      >
        <VStack spacing={8} w="100%" align="left">
          <CreateTeamHeading />
          <CreateTeamForm />
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

NewTeamPage.getLayout = (page) => (
  <ProtectedLayout title={"Create New Team"}>{page}</ProtectedLayout>
);

export default NewTeamPage;
