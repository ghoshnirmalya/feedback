import { Button, Heading, HStack } from "@chakra-ui/react";
import { Link } from "blitz";
import React, { FC } from "react";

const CreateProjectHeading: FC = () => {
  return (
    <HStack spacing={8} justifyContent="space-between" w="100%">
      <Heading>Create project</Heading>
      <Link href="/projects" passHref>
        <Button colorScheme="blue" variant="outline">
          All projects
        </Button>
      </Link>
    </HStack>
  );
};

export default CreateProjectHeading;
