import { Box, Center, Grid, Image, Spinner } from "@chakra-ui/react";
import getProjects from "app/projects/queries/getProjects";
import { Link, usePaginatedQuery } from "blitz";
import React from "react";

const ProjectsList = () => {
  const [{ projects }] = usePaginatedQuery(getProjects, {
    orderBy: { updatedAt: "desc" },
  });

  return (
    <Grid
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(4, 1fr)",
      ]}
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
              <Image
                src="https://via.placeholder.com/150"
                fallback={
                  <Center p={4} minH={24}>
                    <Spinner />
                  </Center>
                }
                alt={project.name}
                w="100%"
                borderTopRadius={4}
              />
              <Box p={4} fontWeight="bold">
                {project.name}
              </Box>
            </Box>
          </Link>
        );
      })}
    </Grid>
  );
};

export default ProjectsList;
