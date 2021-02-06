import { Box, Center, Flex, Link as ChakraLink, Text } from "@chakra-ui/react";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import TopNavbar from "app/layouts/ProtectedLayout/TopNavbar";
import getProject from "app/projects/queries/getProject";
import { Link, useParam, useQuery } from "blitz";
import React, { ReactNode } from "react";

type ContainerProps = {
  title?: string;
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  const projectId = useParam("projectId", "number");
  const [project] = useQuery(getProject, {
    where: { id: projectId },
  });
  const currentUser = useCurrentUser();

  if (!project.isPublic && !currentUser) {
    return (
      <Center h="100vh">
        <Box p={8} bg="gray.100" rounded="md">
          <Text fontWeight="bold">
            You need to{" "}
            <Link href="/sign-in" passHref>
              <ChakraLink>sign in</ChakraLink>
            </Link>{" "}
            to view this content.
          </Text>
        </Box>
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
