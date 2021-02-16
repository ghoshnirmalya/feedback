import {
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import ProtectedLayout from "app/layouts/ProtectedLayout";
import { setCurrentUser } from "app/slices/currentUser";
import { wrapper } from "app/store";
import TeamsList from "app/teams/components/TeamsList";
import getCurrentUser from "app/users/queries/getCurrentUser";
import { BlitzPage, invokeWithMiddleware, Link } from "blitz";
import React, { Suspense } from "react";

const TeamsPage: BlitzPage = () => {
  const headingNode = () => {
    return (
      <HStack spacing={8} justifyContent="space-between" w="100%">
        <Heading fontSize="2xl">Teams</Heading>
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

TeamsPage.getLayout = (page) => (
  <ProtectedLayout title={"Teams"}>{page}</ProtectedLayout>
);

export default TeamsPage;
