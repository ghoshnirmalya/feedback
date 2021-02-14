import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import { Link } from "blitz";
import React from "react";

type ProjectFormProps = {
  initialValues: any;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  isError: boolean;
};

const ProjectForm = ({
  onSubmit,
  isLoading,
  isError,
  initialValues,
}: ProjectFormProps) => {
  const currentUser = useCurrentUser();

  const alertNode = () => {
    if (!isError) {
      return false;
    }

    return (
      <Alert status="error" rounded="md">
        <AlertIcon />
        <AlertTitle>Something went wrong! Please try again.</AlertTitle>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  };

  return (
    <Box bgColor="white" rounded="md" shadow="sm" borderWidth={1}>
      <VStack spacing={4} align="left">
        {alertNode()}
        <form
          onSubmit={(event) => {
            event.preventDefault();

            onSubmit(event);
          }}
        >
          <VStack spacing={0} align="left">
            <VStack spacing={4} align="left" p={4}>
              <FormControl id="name" isRequired isDisabled={isLoading}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Personal portfolio"
                  defaultValue={initialValues.name}
                />
              </FormControl>
            </VStack>
            <HStack p={4} borderTopWidth={1} spacing={4}>
              <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                {initialValues.id ? "Edit" : "Create"}
              </Button>
              <Link href="/projects">
                <Button colorScheme="red" isLoading={isLoading} variant="link">
                  Cancel
                </Button>
              </Link>
            </HStack>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default ProjectForm;
