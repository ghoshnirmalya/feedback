import { Container, VStack } from "@chakra-ui/react";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import ProtectedLayout from "app/layouts/ProtectedLayout";
import CreateTeamHeading from "app/teams/components/CreateTeamHeading";
import TeamForm from "app/teams/components/TeamForm";
import createTeam from "app/teams/mutations/createTeam";
import { BlitzPage, useMutation, useRouter } from "blitz";
import { UserCreateManyWithoutTeamInput } from "db";

const NewTeamPage: BlitzPage = () => {
  const router = useRouter();
  const [createTeamMutation, { isLoading, isError }] = useMutation(createTeam);
  const currentUser = useCurrentUser();

  return (
    <Container maxW="6xl" p={8}>
      <VStack spacing={8} w="100%" align="left">
        <CreateTeamHeading />
        <TeamForm
          initialValues={{}}
          isLoading={isLoading}
          isError={isError}
          onSubmit={async (event) => {
            try {
              const team = await createTeamMutation({
                data: {
                  name: event.target[0].value,
                  User: currentUser as UserCreateManyWithoutTeamInput,
                },
              });

              router.push(`/teams/${team.id}`);
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </VStack>
    </Container>
  );
};

NewTeamPage.getLayout = (page) => (
  <ProtectedLayout title={"Create New Team"}>{page}</ProtectedLayout>
);

export default NewTeamPage;
