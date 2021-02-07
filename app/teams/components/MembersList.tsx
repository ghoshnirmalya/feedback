import { Avatar, AvatarGroup } from "@chakra-ui/react";
import getTeam from "app/teams/queries/getTeam";
import { useParam, useQuery } from "blitz";
import React, { FC } from "react";

const MembersList: FC = () => {
  const teamId = useParam("teamId", "number");
  const [team] = useQuery(getTeam, {
    where: { id: teamId },
  });

  const avatarsNode = () =>
    team.users.map((user) => {
      return <Avatar key={user.id} name={user.email} />;
    });

  return (
    <AvatarGroup size="sm" max={5}>
      {avatarsNode()}
    </AvatarGroup>
  );
};

export default MembersList;
