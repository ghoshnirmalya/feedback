import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import ErrorState from "app/components/ErrorState";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import ProjectStateRadio from "app/projects/components/DetailsSidebar/ProjectStateRadio";
import deleteProject from "app/projects/mutations/deleteProject";
import { Link, useMutation, useParam, useRouter } from "blitz";
import React, { FC } from "react";
import { MdLock } from "react-icons/md";

const ProjectSettings: FC = () => {
  const router = useRouter();
  const projectId = useParam("projectId", "string");
  const currentUser = useCurrentUser();
  const [deleteProjectMutation, { isLoading, isError }] = useMutation(
    deleteProject
  );

  if (!currentUser) {
    return (
      <Box p={4}>
        <ErrorState
          heading="Unauthorized"
          text="You need to sign in to view this content."
          buttons={[
            <Link href="/auth" passHref>
              <Button colorScheme="yellow" leftIcon={<MdLock />}>
                Sign in
              </Button>
            </Link>,
          ]}
        />
      </Box>
    );
  }

  const projectEditButtonNode = () => {
    return (
      <Box borderBottomWidth={1}>
        <Box borderBottomWidth={1} px={4} py={2} bg="gray.100">
          <Heading size="sm">Modify project</Heading>
        </Box>
        <Box p={4}>
          <HStack spacing={4}>
            <Link href={`/projects/${projectId}/edit`} passHref>
              <Button
                as="a"
                colorScheme="yellow"
                size="lg"
                w="100%"
                isLoading={isLoading}
              >
                Edit project
              </Button>
            </Link>
            <Button
              colorScheme="red"
              size="lg"
              isLoading={isLoading}
              w="100%"
              onClick={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteProjectMutation({
                    where: { id: projectId },
                  });

                  router.push("/projects");
                }
              }}
            >
              Delete project
            </Button>
          </HStack>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <ProjectStateRadio />
      {projectEditButtonNode()}
    </>
  );
};

export default ProjectSettings;
