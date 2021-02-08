import { Center, Container, Spinner, VStack } from "@chakra-ui/react";
import ProtectedLayout from "app/layouts/ProtectedLayout";
import EditProjectForm from "app/projects/components/EditProjectForm";
import EditProjectHeading from "app/projects/components/EditProjectHeading";
import { BlitzPage } from "blitz";
import React, { Suspense } from "react";

const EditProjectPage: BlitzPage = () => {
  return (
    <Container maxW="6xl" p={8}>
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

EditProjectPage.getLayout = (page) => (
  <ProtectedLayout title={"Edit Project"}>{page}</ProtectedLayout>
);

export default EditProjectPage;
