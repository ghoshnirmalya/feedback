import { Box, Center, Grid } from "@chakra-ui/react";
import getProjects from "app/projects/queries/getProjects";
import { Link, usePaginatedQuery, useParam } from "blitz";
import React from "react";
const ProjectsList = () => {
  const teamId = useParam("teamId", "number");
  const [{ projects }] = usePaginatedQuery(getProjects, {
    orderBy: { updatedAt: "desc" },
    where: {
      team: {
        id: teamId,
      },
    },
  });

  return (
    <Grid
      templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
      gap={8}
      w="100%"
    >
      {projects.map((project) => {
        return (
          <Link key={project.id} href={`/projects/${project.id}`} passHref>
            <Box
              as="a"
              bgColor="white"
              rounded="md"
              shadow="sm"
              borderWidth={1}
            >
              <Center p={4} fontWeight="bold" h={48}>
                {project.name}
              </Center>
            </Box>
          </Link>
        );
      })}
    </Grid>
  );
};

export default ProjectsList;
