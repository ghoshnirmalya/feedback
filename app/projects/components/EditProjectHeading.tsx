import { Button, Heading, HStack } from "@chakra-ui/react";
import getProject from "app/projects/queries/getProject";
import { Link, useParam, useQuery } from "blitz";
import React, { FC } from "react";

const EditProjectHeading: FC = () => {
  const projectId = useParam("projectId", "number");
  const [project] = useQuery(getProject, {
    where: { id: projectId },
  });

  return (
    <HStack spacing={8} justifyContent="space-between" w="100%">
      <Heading>Edit {project.name}</Heading>
      <Link href="/projects" passHref>
        <Button colorScheme="blue" variant="outline">
          All projects
        </Button>
      </Link>
    </HStack>
  );
};

export default EditProjectHeading;
