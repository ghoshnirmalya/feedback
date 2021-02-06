import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import ProtectedLayout from "app/layouts/ProtectedLayout";
import TeamsList from "app/teams/components/TeamsList";
import { BlitzPage, Link } from "blitz";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const TeamsPage: BlitzPage = () => {
  const headingNode = () => {
    return (
      <HStack spacing={8} justifyContent="space-between" w="100%">
        <Heading>Teams</Heading>
        <Link href="/teams/new" passHref>
          <Button colorScheme="blue">Create Team</Button>
        </Link>
      </HStack>
    );
  };

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
            {headingNode()}
            <TeamsList />
          </VStack>
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
};

TeamsPage.getLayout = (page) => (
  <ProtectedLayout title={"Teams"}>{page}</ProtectedLayout>
);

export default TeamsPage;
