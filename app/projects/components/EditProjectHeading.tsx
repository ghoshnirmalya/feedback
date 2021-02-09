import { Heading, HStack } from "@chakra-ui/react";
import getProject from "app/projects/queries/getProject";
import { useParam, useQuery } from "blitz";
import React, { FC } from "react";

const EditProjectHeading: FC = () => {
  const projectId = useParam("projectId", "number");
  const [project] = useQuery(getProject, {
    where: { id: projectId },
  });

  return (
    <HStack spacing={8} justifyContent="space-between" w="100%">
      <Heading fontSize="2xl">Edit {project.name}</Heading>
    </HStack>
  );
};

export default EditProjectHeading;
