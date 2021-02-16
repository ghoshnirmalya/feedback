import { Center, Container, Spinner, VStack } from "@chakra-ui/react";
import ProtectedLayout from "app/layouts/ProtectedLayout";
import CreateProjectForm from "app/projects/components/CreateProjectForm";
import CreateProjectHeading from "app/projects/components/CreateProjectHeading";
import { BlitzPage, invokeWithMiddleware } from "blitz";
import React, { Suspense } from "react";
import { setCurrentUser } from "app/slices/currentUser";
import { wrapper } from "app/store";
import getCurrentUser from "app/users/queries/getCurrentUser";

const NewProjectPage: BlitzPage = () => {
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
          <CreateProjectHeading />
          <CreateProjectForm />
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

NewProjectPage.getLayout = (page) => (
  <ProtectedLayout title={"Create New Project"}>{page}</ProtectedLayout>
);

export default NewProjectPage;
