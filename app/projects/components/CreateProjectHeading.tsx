import { Heading, HStack } from "@chakra-ui/react";
import React, { FC } from "react";

const CreateProjectHeading: FC = () => {
  return (
    <HStack spacing={8} justifyContent="space-between" w="100%">
      <Heading fontSize="2xl">Create a new project</Heading>
    </HStack>
  );
};

export default CreateProjectHeading;
