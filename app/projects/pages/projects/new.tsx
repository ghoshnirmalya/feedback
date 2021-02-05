import { Container, VStack } from "@chakra-ui/react";
import ProtectedLayout from "app/layouts/ProtectedLayout";
import CreateProjectHeading from "app/projects/components/CreateProjectHeading";
import ProjectForm from "app/projects/components/ProjectForm";
import createProject from "app/projects/mutations/createProject";
import { BlitzPage, useMutation, useRouter } from "blitz";
import React from "react";

const NewProjectPage: BlitzPage = () => {
  const router = useRouter();
  const [createProjectMutation, { isLoading, isError }] = useMutation(
    createProject
  );

  return (
    <Container maxW="6xl" p={8}>
      <VStack spacing={8} w="100%" align="left">
        <CreateProjectHeading />
        <ProjectForm
          initialValues={{}}
          isLoading={isLoading}
          isError={isError}
          onSubmit={async (event) => {
            try {
              const project = await createProjectMutation({
                data: { name: event.target[0].value },
              });

              router.push(`/projects/${project.id}`);
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </VStack>
    </Container>
  );
};

NewProjectPage.getLayout = (page) => (
  <ProtectedLayout title={"Create New Project"}>{page}</ProtectedLayout>
);

export default NewProjectPage;
