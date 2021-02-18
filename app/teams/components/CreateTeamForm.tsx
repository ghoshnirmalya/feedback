import { Prisma } from "db";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import TeamForm from "app/teams/components/TeamForm";
import createTeam from "app/teams/mutations/createTeam";
import { useMutation, useRouter } from "blitz";
import { FC } from "react";

const CreateTeamForm: FC = () => {
  const router = useRouter();
  const [createTeamMutation, { isLoading, isError }] = useMutation(createTeam);
  const currentUser = useCurrentUser();

  return (
    <TeamForm
      initialValues={{}}
      isLoading={isLoading}
      isError={isError}
      onSubmit={async (event) => {
        try {
          const team = await createTeamMutation({
            data: {
              name: event.target[0].value,
              description: event.target[1].value,
              users: currentUser as Prisma.UserCreateNestedManyWithoutTeamsInput,
            },
          });

          router.push(`/teams/${team.id}`);
        } catch (error) {
          console.log(error);
        }
      }}
    />
  );
};

export default CreateTeamForm;
