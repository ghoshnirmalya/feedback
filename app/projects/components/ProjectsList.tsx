import { Box, Grid, Heading, HStack, Text } from "@chakra-ui/react";
import getProjects from "app/projects/queries/getProjects";
import { Link, usePaginatedQuery, useParam } from "blitz";
import { Project, Team } from "db";
import React, { FC } from "react";

const ProjectsList: FC = () => {
  const teamId = useParam("teamId", "string");
  const [{ projects }] = usePaginatedQuery(
    getProjects,
    {
      orderBy: { updatedAt: "desc" },
      where: {
        teamId,
      },
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
    }
  );

  const nameNode = (project: Project) => {
    return <Heading size="sm">{project.name}</Heading>;
  };

  const teamNode = (
    project: Project & {
      team: Team;
    }
  ) => {
    if (!project.team) {
      return false;
    }

    return <Text fontSize="sm">{project.team.name}</Text>;
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
                {teamNode(
                  project as Project & {
                    team: Team;
                  }
                )}
              </HStack>
            </Box>
          </Link>
        );
      })}
    </Grid>
  );
};

export default ProjectsList;
