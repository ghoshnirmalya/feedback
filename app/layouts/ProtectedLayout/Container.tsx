import { Box, Center, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import TopNavbar from "app/layouts/ProtectedLayout/TopNavbar";
import { Link } from "blitz";
import React, { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return (
      <Center h="100vh">
        <Box p={8} bg="gray.100" rounded="md">
          <Text fontWeight="bold">
            You need to{" "}
            <Link href="/auth" passHref>
              <ChakraLink>sign in</ChakraLink>
            </Link>{" "}
            to view this content.
          </Text>
        </Box>
      </Center>
    );
  }

  return (
    <Box minH="100vh" bg="gray.100">
      <TopNavbar />
      <Flex>{children}</Flex>
    </Box>
  );
};

export default Container;
