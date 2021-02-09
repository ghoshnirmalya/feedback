import { Center, Container, Spinner, VStack } from "@chakra-ui/react";
import ProtectedLayout from "app/layouts/ProtectedLayout";
import CreateTeamForm from "app/teams/components/CreateTeamForm";
import CreateTeamHeading from "app/teams/components/CreateTeamHeading";
import { BlitzPage } from "blitz";
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

NewTeamPage.getLayout = (page) => (
  <ProtectedLayout title={"Create New Team"}>{page}</ProtectedLayout>
);

export default NewTeamPage;
