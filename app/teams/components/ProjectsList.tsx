import { Box, Button, Grid, Heading, HStack } from "@chakra-ui/react";
import EmptyState from "app/components/EmptyState";
import getProjects from "app/projects/queries/getProjects";
import { Link, usePaginatedQuery, useParam } from "blitz";
import { Project } from "db";
import React, { FC } from "react";
import { MdAdd } from "react-icons/md";

const ProjectsList: FC = () => {
  const teamId = useParam("teamId", "string");
  const [{ projects }] = usePaginatedQuery(getProjects, {
    orderBy: { updatedAt: "desc" },
    where: {
      team: {
        id: teamId,
      },
    },
  });

  if (!projects.length) {
    return (
      <EmptyState
        icon="/illustrations/Empty Inbox _Two Color.svg"
        heading="Create a Project"
        text="Get started by creating a new project for your team. You can
      add files to a project."
        buttons={[
          <Link href={`/teams/${teamId}/projects/new`} passHref>
            <Button as="a" colorScheme="blue" size="lg" leftIcon={<MdAdd />}>
              Create a new Project
            </Button>
          </Link>,
        ]}
      />
    );
  }

  const nameNode = (project: Project) => {
    return <Heading size="sm">{project.name}</Heading>;
  };

  return (
    <Grid templateColumns={["repeat(1, 1fr)"]} gap={8} w="100%">
      {projects.map((project) => {
        return (
          <Link key={project.id} href={`/projects/${project.id}`} passHref>
            <Box
              as="a"
              bgColor="white"
              rounded="md"
              shadow="sm"
              borderWidth={1}
              p={4}
            >
              <HStack
                align="left"
                spacing={4}
                justifyContent="space-between"
                alignItems="center"
              >
                {nameNode(project)}
              </HStack>
            </Box>
          </Link>
        );
      })}
    </Grid>
  );
};

export default ProjectsList;
