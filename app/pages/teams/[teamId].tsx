import { Center, Container, Spinner, VStack } from "@chakra-ui/react";
import ProtectedLayout from "app/core/layouts/ProtectedLayout";
import ProjectsList from "app/teams/components/ProjectsList";
import TeamHeading from "app/teams/components/TeamHeading";
import { BlitzPage } from "blitz";
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

ShowTeamPage.getLayout = (page) => (
  <ProtectedLayout title={"Team"}>{page}</ProtectedLayout>
);

export default ShowTeamPage;
