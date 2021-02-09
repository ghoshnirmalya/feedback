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
  Select,
  VStack,
} from "@chakra-ui/react";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import getTeams from "app/teams/queries/getTeams";
import { Link, useQuery } from "blitz";
import React, { useState } from "react";

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
  const [name, setName] = useState<string>(initialValues.name);
  const currentUser = useCurrentUser();
  const [{ teams }] = useQuery(getTeams, {
    where: {
      users: {
        some: {
          id: currentUser?.id,
        },
      },
    },
  });

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
              <FormControl id="team" isRequired isDisabled={isLoading}>
                <FormLabel>Team</FormLabel>
                <Select
                  placeholder="Select team"
                  defaultValue={initialValues.team?.id}
                >
                  {teams.map((team) => {
                    return (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    );
                  })}
                </Select>
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
