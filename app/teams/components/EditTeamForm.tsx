import TeamForm from "app/teams/components/TeamForm";
import updateTeam from "app/teams/mutations/updateTeam";
import getTeam from "app/teams/queries/getTeam";
import { useMutation, useParam, useQuery, useRouter } from "blitz";
import { Project, Team, User, UserCreateManyWithoutTeamsInput } from "db";
import React, { FC } from "react";

const EditTeamForm: FC = () => {
  const router = useRouter();
  const teamId = useParam("teamId", "string");
  const [team, { setQueryData }] = useQuery(
    getTeam,
    {
      where: { id: teamId },
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
    }
  );
  const [updateTeamMutation, { isLoading, isError }] = useMutation(updateTeam);

  return (
    <TeamForm
      initialValues={team}
      isLoading={isLoading}
      isError={isError}
      onSubmit={async (event) => {
        try {
          const updated = (await updateTeamMutation({
            where: { id: team.id },
            data: {
              name: event.target[0].value,
              description: event.target[1].value,
              users: team.users.map(({ id }) => ({
                id,
              })) as UserCreateManyWithoutTeamsInput,
            },
          })) as Team & { users: User[]; projects: Project[] };

          await setQueryData(updated);

          router.push(`/teams/${updated.id}`);
        } catch (error) {
          console.log(error);
        }
      }}
    />
  );
};

export default EditTeamForm;
