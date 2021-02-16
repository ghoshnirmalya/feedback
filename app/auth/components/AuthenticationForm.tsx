import { Button, Center, Container } from "@chakra-ui/react";
import { Link } from "blitz";
import React, { FC } from "react";

const AuthenticationForm: FC = () => {
  return (
    <Container maxW="2xl" py={24} minH="100vh">
      <Center h="100%">
        <Link href="/api/auth/google/callback" passHref>
          <Button colorScheme="yellow" type="submit" size="lg">
            Authenticate using your Google account
          </Button>
        </Link>
      </Center>
    </Container>
  );
};

export default AuthenticationForm;
