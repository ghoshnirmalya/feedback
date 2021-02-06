import { Container, Spinner, VStack } from "@chakra-ui/react";
import ProtectedLayout from "app/layouts/ProtectedLayout";
import CreateProjectForm from "app/projects/components/CreateProjectForm";
import CreateProjectHeading from "app/projects/components/CreateProjectHeading";
import { BlitzPage } from "blitz";
import React, { Suspense } from "react";

const NewProjectPage: BlitzPage = () => {
  return (
    <Container maxW="6xl" centerContent p={8}>
      <Suspense fallback={<Spinner />}>
        <VStack spacing={8} w="100%" align="left">
          <CreateProjectHeading />
          <CreateProjectForm />
        </VStack>
      </Suspense>
    </Container>
  );
};

NewProjectPage.getLayout = (page) => (
  <ProtectedLayout title={"Create New Project"}>{page}</ProtectedLayout>
);

export default NewProjectPage;
