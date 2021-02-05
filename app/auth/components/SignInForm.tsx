import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import login from "app/auth/mutations/login";
import { FORM_ERROR } from "app/components/Form";
import { AuthenticationError, useMutation } from "blitz";
import React from "react";

type SignInFormProps = {
  onSuccess?: () => void;
};

export const SignInForm = (props: SignInFormProps) => {
  const [loginMutation] = useMutation(login);

  return (
    <Box
      p={8}
      bgColor="white"
      rounded="md"
      shadow="sm"
      borderWidth={1}
      w={["100%", "100%", "50%"]}
    >
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
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" };
            } else {
              return {
                [FORM_ERROR]:
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
            <HStack spacing={4} w="100%" justifyContent="flex-end">
              <Button colorScheme="blue" type="submit">
                Sign In
              </Button>
            </HStack>
          </Box>
        </VStack>
      </form>
    </Box>
  );
};

export default SignInForm;
