import {
  Button,
  Container,
  Heading,
  HStack,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import Layout from "app/layouts/Layout";
import ProjectsList from "app/projects/components/ProjectsList";
import { BlitzPage, Link } from "blitz";
import React, { Suspense } from "react";

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
      <Suspense fallback={<Spinner />}>
        <VStack spacing={8} w="100%" align="left">
          {headingNode()}
          <ProjectsList />
        </VStack>
      </Suspense>
    </Container>
  );
};

ProjectsPage.getLayout = (page) => <Layout title={"Projects"}>{page}</Layout>;

export default ProjectsPage;
