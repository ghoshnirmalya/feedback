import { Center, Container, Spinner, VStack } from "@chakra-ui/react";
import ProtectedLayout from "app/layouts/ProtectedLayout";
import EditProjectForm from "app/projects/components/EditProjectForm";
import EditProjectHeading from "app/projects/components/EditProjectHeading";
import { setCurrentUser } from "app/slices/currentUser";
import { wrapper } from "app/store";
import getCurrentUser from "app/users/queries/getCurrentUser";
import { BlitzPage, invokeWithMiddleware } from "blitz";
import React, { Suspense } from "react";

const EditProjectPage: BlitzPage = () => {
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
          <EditProjectHeading />
          <EditProjectForm />
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

EditProjectPage.getLayout = (page) => (
  <ProtectedLayout title={"Edit Project"}>{page}</ProtectedLayout>
);

export default EditProjectPage;
