import { Button, Heading, HStack } from "@chakra-ui/react";
import ManageUsers from "app/teams/components/ManageUsers";
import MembersList from "app/teams/components/MembersList";
import deleteTeam from "app/teams/mutations/deleteTeam";
import getTeam from "app/teams/queries/getTeam";
import { Link, useMutation, useParam, useQuery, useRouter } from "blitz";
import React, { FC } from "react";

const TeamHeading: FC = () => {
  const router = useRouter();
  const teamId = useParam("teamId", "number");
  const [team] = useQuery(getTeam, { where: { id: teamId } });
  const [deleteTeamMutation] = useMutation(deleteTeam);

  return (
    <HStack spacing={8} justifyContent="space-between" w="100%">
      <Heading>{team.name}</Heading>
      <HStack spacing={4}>
        <MembersList />
        <ManageUsers />
        <Button
          colorScheme="red"
          variant="outline"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTeamMutation({ where: { id: team.id } });
              router.push("/teams");
            }
          }}
        >
          Delete
        </Button>
      </HStack>
    </HStack>
  );
};

export default TeamHeading;
