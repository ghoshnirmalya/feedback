import { getCurrentUserData } from "app/selectors/currentUser";
import TeamForm from "app/teams/components/TeamForm";
import createTeam from "app/teams/mutations/createTeam";
import { useMutation, useRouter } from "blitz";
import { UserCreateManyWithoutTeamsInput } from "db";
import { FC } from "react";
import { useSelector } from "react-redux";

const CreateTeamForm: FC = () => {
  const router = useRouter();
  const [createTeamMutation, { isLoading, isError }] = useMutation(createTeam);
  const currentUser = useSelector(getCurrentUserData());

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
              users: currentUser as UserCreateManyWithoutTeamsInput,
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
