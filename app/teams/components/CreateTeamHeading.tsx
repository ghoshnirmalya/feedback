import { Button, Heading, HStack } from "@chakra-ui/react";
import { Link } from "blitz";
import React, { FC } from "react";

const CreateTeamHeading: FC = () => {
  return (
    <HStack spacing={8} justifyContent="space-between" w="100%">
      <Heading>Create team</Heading>
      <Link href="/teams" passHref>
        <Button colorScheme="blue" variant="outline">
          All teams
        </Button>
      </Link>
    </HStack>
  );
};

export default CreateTeamHeading;
