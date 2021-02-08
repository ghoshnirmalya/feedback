import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import login from "app/auth/mutations/login";
import { AuthenticationError, Link, useMutation } from "blitz";
import React from "react";

type SignInFormProps = {
  onSuccess?: () => void;
};

export const SignInForm = (props: SignInFormProps) => {
  const [loginMutation, { isLoading, isError }] = useMutation(login);

  const alertNode = () => {
    if (!isError) {
      return false;
    }

    return (
      <Alert status="error" rounded="md">
        <AlertIcon />
        <AlertTitle>Something went wrong! Please try again.</AlertTitle>
      </Alert>
    );
  };

  return (
    <Box
      p={8}
      bgColor="white"
      rounded="md"
      shadow="sm"
      borderWidth={1}
      w={["100%", "100%", "50%"]}
    >
      <VStack spacing={8} align="left">
        {alertNode()}
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            try {
              await loginMutation({
                email: event.target[0].value,
                password: event.target[1].value,
              });
              props.onSuccess?.();
            } catch (error) {
              if (error instanceof AuthenticationError) {
                return { error: "Sorry, those credentials are invalid" };
              } else {
                return {
                  error:
                    "Sorry, we had an unexpected error. Please try again. - " +
                    error.toString(),
                };
              }
            }
          }}
        >
          <VStack spacing={4} align="left">
            <Box>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder="John Doe" />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input placeholder="Password" type="password" />
              </FormControl>
            </Box>
            <Box>
              <HStack spacing={4} w="100%" justifyContent="space-between">
                <Link href="/sign-up">
                  <Button
                    colorScheme="blue"
                    variant="link"
                    isLoading={isLoading}
                  >
                    Don't have an account?
                  </Button>
                </Link>
                <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                  Sign In
                </Button>
              </HStack>
            </Box>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default SignInForm;
