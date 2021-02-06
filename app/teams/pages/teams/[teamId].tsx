import { Box, Container, Spinner, Text, VStack } from "@chakra-ui/react";
import ProtectedLayout from "app/layouts/ProtectedLayout";
import ProjectsList from "app/teams/components/ProjectsList";
import TeamHeading from "app/teams/components/TeamHeading";
import { BlitzPage } from "blitz";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const ShowTeamPage: BlitzPage = () => {
  return (
    <Container maxW="6xl" centerContent p={8}>
      <ErrorBoundary
        fallbackRender={({ error }) => {
          return (
            <Box p={8} bg="gray.100" rounded="md">
              <Text fontWeight="bold">{error.message}</Text>
            </Box>
          );
        }}
      >
        <Suspense fallback={<Spinner />}>
          <VStack spacing={8} w="100%" align="left">
            <TeamHeading />
            <ProjectsList />
          </VStack>
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
};

ShowTeamPage.getLayout = (page) => (
  <ProtectedLayout title={"Team"}>{page}</ProtectedLayout>
);

export default ShowTeamPage;
