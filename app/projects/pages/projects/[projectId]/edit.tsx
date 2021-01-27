import { Container, Spinner, VStack } from "@chakra-ui/react";
import Layout from "app/layouts/Layout";
import EditProjectForm from "app/projects/components/EditProjectForm";
import EditProjectHeading from "app/projects/components/EditProjectHeading";
import { BlitzPage } from "blitz";
import React, { Suspense } from "react";

const EditProjectPage: BlitzPage = () => {
  return (
    <Container maxW="6xl">
      <Suspense fallback={<Spinner />}>
        <VStack spacing={8} w="100%" align="left">
          <EditProjectHeading />
          <EditProjectForm />
        </VStack>
      </Suspense>
    </Container>
  );
};

EditProjectPage.getLayout = (page) => (
  <Layout title={"Edit Project"}>{page}</Layout>
);

export default EditProjectPage;
