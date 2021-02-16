import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import ProtectedLayout from "app/layouts/ProtectedLayout";
import ProjectsList from "app/projects/components/ProjectsList";
import { setCurrentUser } from "app/slices/currentUser";
import { wrapper } from "app/store";
import getCurrentUser from "app/users/queries/getCurrentUser";
import { BlitzPage, invokeWithMiddleware, Link } from "blitz";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const ProjectsPage: BlitzPage = () => {
  const headingNode = () => {
    return (
      <HStack spacing={8} justifyContent="space-between" w="100%">
        <Heading fontSize="2xl">Projects</Heading>
        <Link href="/projects/new" passHref>
          <Button colorScheme="yellow" size="sm">
            Create Project
          </Button>
        </Link>
      </HStack>
    );
  };

  return (
    <Container maxW="2xl" centerContent p={8}>
      <ErrorBoundary
        fallbackRender={({ error }) => {
          return (
            <Box p={8} bg="gray.100" rounded="md">
              <Text fontWeight="bold">{error.message}</Text>
            </Box>
          );
        }}
      >
        <Suspense
          fallback={
            <Center h="100vh">
              <Spinner />
            </Center>
          }
        >
          <VStack spacing={8} w="100%" align="left">
            {headingNode()}
            <ProjectsList />
          </VStack>
        </Suspense>
      </ErrorBoundary>
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

ProjectsPage.getLayout = (page) => (
  <ProtectedLayout title={"Projects"}>{page}</ProtectedLayout>
);

export default ProjectsPage;
