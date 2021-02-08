import { Button, Center, Container } from "@chakra-ui/react";
import { Link } from "blitz";
import React, { FC } from "react";

const isProduction = process.env.NODE_ENV === "production";
const callbackURL = isProduction
  ? `${process.env.VERCEL_URL}/api/auth/google/callback`
  : "http://localhost:3000/api/auth/google/callback";

const AuthenticationForm: FC = () => {
  return (
    <Container maxW="4xl" py={24} minH="100vh">
      <Center h="100%">
        <Link href={callbackURL} passHref>
          <Button colorScheme="blue" type="submit" size="lg">
            Authenticate using your Google account
          </Button>
        </Link>
      </Center>
    </Container>
  );
};

export default AuthenticationForm;
