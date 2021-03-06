import { Box, Button, Center, Flex } from "@chakra-ui/react";
import ErrorState from "app/core/components/ErrorState";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import TopNavbar from "app/core/layouts/ProtectedLayout/TopNavbar";
import getProject from "app/projects/queries/getProject";
import { Link, useParam, useQuery } from "blitz";
import React, { ReactNode } from "react";
import { MdLock } from "react-icons/md";

type ContainerProps = {
  title?: string;
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  const projectId = useParam("projectId", "string");
  const [project] = useQuery(
    getProject,
    {
      where: { id: projectId },
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
    }
  );
  const currentUser = useCurrentUser();

  if (!project.isPublic && !currentUser) {
    return (
      <Center h="100vh">
        <ErrorState
          heading="Unauthorized"
          text="You need to sign in to view this content."
          buttons={[
            <Link href="/auth" passHref key="authButton">
              <Button colorScheme="yellow" size="lg" leftIcon={<MdLock />}>
                Sign in
              </Button>
            </Link>,
          ]}
        />
      </Center>
    );
  }

  return (
    <Box minH="100vh">
      <TopNavbar />
      <Flex>{children}</Flex>
    </Box>
  );
};

export default Container;
