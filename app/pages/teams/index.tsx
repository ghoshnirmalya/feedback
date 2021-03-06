import {
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import ProtectedLayout from "app/core/layouts/ProtectedLayout";
import TeamsList from "app/teams/components/TeamsList";
import { BlitzPage, Link } from "blitz";
import React, { Suspense } from "react";

const TeamsPage: BlitzPage = () => {
  const headingNode = () => {
    return (
      <HStack spacing={8} justifyContent="space-between" w="100%">
        <Heading fontSize="2xl" isTruncated>
          Teams
        </Heading>
        <Link href="/teams/new" passHref>
          <Button as="a" colorScheme="yellow" size="sm">
            Create Team
          </Button>
        </Link>
      </HStack>
    );
  };

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
          {headingNode()}
          <TeamsList />
        </VStack>
      </Suspense>
    </Container>
  );
};

TeamsPage.getLayout = (page) => (
  <ProtectedLayout title={"Teams"}>{page}</ProtectedLayout>
);

export default TeamsPage;
