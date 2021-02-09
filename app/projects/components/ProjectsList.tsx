import { Text, Box, Grid, Heading, VStack, HStack } from "@chakra-ui/react";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import getProjects from "app/projects/queries/getProjects";
import { Link, usePaginatedQuery } from "blitz";
import { Project, Team } from "db";
import React, { FC } from "react";

const ProjectsList: FC = () => {
  const currentUser = useCurrentUser();
  const [{ projects }] = usePaginatedQuery(getProjects, {
    orderBy: { updatedAt: "desc" },
    where: {
      team: {
        users: {
          some: {
            id: currentUser?.id,
          },
        },
      },
    },
  });

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
