import { Box, Button, Center, Flex } from "@chakra-ui/react";
import ErrorState from "app/components/ErrorState";
import TopNavbar from "app/layouts/ProtectedLayout/TopNavbar";
import getProject from "app/projects/queries/getProject";
import { getCurrentUserData } from "app/selectors/currentUser";
import { Link, useParam, useQuery } from "blitz";
import React, { ReactNode } from "react";
import { MdLock } from "react-icons/md";
import { useSelector } from "react-redux";

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
  const currentUser = useSelector(getCurrentUserData());

  if (!project.isPublic && !currentUser) {
    return (
      <Center h="100vh">
        <ErrorState
          heading="Unauthorized"
          text="You need to sign in to view this content."
          buttons={[
            <Link href="/auth" passHref>
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
