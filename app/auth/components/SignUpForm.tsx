import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import signup from "app/auth/mutations/signup";
import { Link, useMutation } from "blitz";
import React from "react";

type SignUpFormProps = {
  onSuccess?: (
    user: User,
    isCreateDefaultDataSelected: boolean
  ) => Promise<void>;
};

export const SignUpForm = (props: SignUpFormProps) => {
  const [signupMutation, { isLoading, isError }] = useMutation(signup);

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

            const isCreateDefaultDataSelected = event.target[2].checked;

            try {
              const user = await signupMutation({
                email: event.target[0].value,
                password: event.target[1].value,
              });
              props.onSuccess?.(user as User, isCreateDefaultDataSelected);
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
              <FormControl id="createDefaultData" isRequired>
                <Checkbox defaultChecked>Create default data for me</Checkbox>
              </FormControl>
            </Box>
            <Box>
              <HStack spacing={4} w="100%" justifyContent="space-between">
                <Link href="/sign-in">
                  <Button
                    colorScheme="blue"
                    variant="link"
                    isLoading={isLoading}
                  >
                    Already have an account?
                  </Button>
                </Link>
                <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                  Sign Up
                </Button>
              </HStack>
            </Box>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default SignUpForm;
