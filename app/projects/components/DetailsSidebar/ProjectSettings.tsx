import { Box, Button, Heading } from "@chakra-ui/react";
import ErrorState from "app/components/ErrorState";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import ProjectStateDropdown from "app/layouts/ProtectedLayout/TopNavbar/ProjectStateDropdown";
import { Link, useParam } from "blitz";
import React, { FC } from "react";
import { MdLock } from "react-icons/md";

const ProjectSettings: FC = () => {
  const projectId = useParam("projectId", "string");
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return (
      <Box p={4}>
        <ErrorState
          heading="Unauthorized"
          text="You need to sign in to view this content."
          buttons={[
            <Link href="/auth" passHref>
              <Button colorScheme="blue" leftIcon={<MdLock />}>
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
          <Link href={`/projects/${projectId}/edit`} passHref>
            <Button as="a" colorScheme="blue" size="lg" w="100%">
              Edit Project
            </Button>
          </Link>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <ProjectStateDropdown />
      {projectEditButtonNode()}
    </>
  );
};

export default ProjectSettings;
