import { Box, Button, Center, Flex } from "@chakra-ui/react";
import ErrorState from "app/components/ErrorState";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import TopNavbar from "app/layouts/ProtectedLayout/TopNavbar";
import { Link } from "blitz";
import React, { ReactNode } from "react";
import { MdLock } from "react-icons/md";

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
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
    <Box minH="100vh" bg="gray.100">
      <TopNavbar />
      <Flex>{children}</Flex>
    </Box>
  );
};

export default Container;
