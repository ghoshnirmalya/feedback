import { Box, Center, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import TopNavbar from "app/layouts/ProtectedLayout/TopNavbar";
import { Link, useRouter } from "blitz";
import React, { ReactNode } from "react";

type ContainerProps = {
  title?: string;
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  const currentUser = useCurrentUser();
  const router = useRouter();

  if (currentUser) {
    router.push(`/projects`);
  }

  return (
    <Box minH="100vh">
      <Flex>{children}</Flex>
    </Box>
  );
};

export default Container;
