import { Center, Container } from "@chakra-ui/react";
import { SignUpForm } from "app/auth/components/SignUpForm";
import PublicLayout from "app/layouts/PublicLayout";
import createProject from "app/projects/mutations/createProject";
import createTeam from "app/teams/mutations/createTeam";
import { BlitzPage, useMutation, useRouter } from "blitz";
import {
  TeamCreateOneWithoutProjectsInput,
  User,
  UserCreateManyWithoutTeamsInput,
} from "db";
import React from "react";

const SignupPage: BlitzPage = () => {
  const router = useRouter();
  const [createTeamMutation] = useMutation(createTeam);
  const [createProjectMutation] = useMutation(createProject);

  return (
    <Container maxW="4xl" py={24} minH="100vh">
      <Center h="100%">
        <SignUpForm
          onSuccess={async (
            user: User,
            isCreateDefaultDataSelected: boolean
          ) => {
            if (isCreateDefaultDataSelected) {
              // Create a team "Personal team" when a user signs up
              const team = await createTeamMutation({
                data: {
                  name: "Personal team",
                  description: "This is my personal project",
                  users: user as UserCreateManyWithoutTeamsInput,
                },
              });

              // Create a project "Personal project" when a user signs up
              const project = await createProjectMutation({
                data: {
                  name: "Personal project",
                  team: team as TeamCreateOneWithoutProjectsInput,
                },
              });

              router.push(`/projects/${project.id}`);
            } else {
              router.push("/teams/new");
            }
          }}
        />
      </Center>
    </Container>
  );
};

SignupPage.getLayout = (page) => (
  <PublicLayout title="Sign Up">{page}</PublicLayout>
);

export default SignupPage;
