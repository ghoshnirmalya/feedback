import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import signup from "app/auth/mutations/signup";
import { Link, useMutation } from "blitz";
import React from "react";

type SignUpFormProps = {
  onSuccess?: () => void;
};

export const SignUpForm = (props: SignUpFormProps) => {
  const [signupMutation] = useMutation(signup);

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
            await signupMutation({
              email: event.target[0].value,
              password: event.target[0].value,
            });
            props.onSuccess?.();
          } catch (error) {
            if (
              error.code === "P2002" &&
              error.meta?.target?.includes("email")
            ) {
              // This error comes from Prisma
              return { email: "This email is already being used" };
            } else {
              return { error: error.toString() };
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
              <Link href="/sign-in">
                <Button colorScheme="blue" variant="link">
                  Already have an account?
                </Button>
              </Link>
              <Button colorScheme="blue" type="submit">
                Sign Up
              </Button>
            </HStack>
          </Box>
        </VStack>
      </form>
    </Box>
  );
};

export default SignUpForm;
