import { Button, Heading, HStack } from "@chakra-ui/react";
import getTeam from "app/teams/queries/getTeam";
import { Link, useParam, useQuery } from "blitz";
import React, { FC } from "react";

const EditTeamHeading: FC = () => {
  const teamId = useParam("teamId", "number");
  const [team] = useQuery(getTeam, {
    where: { id: teamId },
  });

  return (
    <HStack spacing={8} justifyContent="space-between" w="100%">
      <Heading>Edit {team.name}</Heading>
      <Link href="/teams" passHref>
        <Button colorScheme="blue" variant="outline">
          All teams
        </Button>
      </Link>
    </HStack>
  );
};

export default EditTeamHeading;
