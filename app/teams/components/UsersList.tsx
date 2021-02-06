import { Avatar, AvatarGroup, Grid } from "@chakra-ui/react";
import getTeam from "app/teams/queries/getTeam";
import { useParam, useQuery } from "blitz";
import React from "react";

const UsersList = () => {
  const teamId = useParam("teamId", "number");
  const [{ users }] = useQuery(getTeam, { where: { id: teamId } });

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
      <AvatarGroup size="md" max={2}>
        {users.map((user) => {
          return <Avatar key={user.id} name={user.name || ""} />;
        })}
      </AvatarGroup>
    </Grid>
  );
};

export default UsersList;
