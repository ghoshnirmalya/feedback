import {
  Button,
  Container,
  Heading,
  HStack,
  Spinner,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import ProtectedLayout from "app/layouts/ProtectedLayout";
import ProjectsList from "app/projects/components/ProjectsList";
import { BlitzPage, ErrorComponent, Link } from "blitz";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const ProjectsPage: BlitzPage = () => {
  const headingNode = () => {
    return (
      <HStack spacing={8} justifyContent="space-between" w="100%">
        <Heading>Projects</Heading>
        <Link href="/projects/new" passHref>
          <Button colorScheme="blue">Create Project</Button>
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
            <ProjectsList />
          </VStack>
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
};

ProjectsPage.getLayout = (page) => (
  <ProtectedLayout title={"Projects"}>{page}</ProtectedLayout>
);

export default ProjectsPage;
