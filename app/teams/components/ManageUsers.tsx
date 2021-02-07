import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import updateTeam from "app/teams/mutations/updateTeam";
import getTeam from "app/teams/queries/getTeam";
import getUser from "app/users/queries/getUser";
import { invoke, useMutation, useParam, useQuery } from "blitz";
import { Project, Team, User, UserCreateManyWithoutTeamsInput } from "db";
import React, { FC, FormEvent } from "react";

const ManageUsers: FC = () => {
  const teamId = useParam("teamId", "number");
  const { onClose } = useDisclosure();
  const [team, { setQueryData }] = useQuery(getTeam, {
    where: { id: teamId },
  });
  const [updateTeamMutation, { isLoading, isError }] = useMutation(updateTeam);

  const handleClick = async (event: FormEvent<HTMLFormElement>) => {
    const userEmail = event.target[0].value;
    const user = await invoke(getUser, { where: { email: userEmail } });

    try {
      const updated = (await updateTeamMutation({
        where: { id: team.id },
        data: {
          name: team.name,
          description: team.description,
          users: user as UserCreateManyWithoutTeamsInput,
        },
      })) as Team & { users: User[]; projects: Project[] };

      await setQueryData(updated);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Popover isLazy placement="bottom-end" closeOnBlur={false}>
      <PopoverTrigger>
        <Button>Invite</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Invite users</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              handleClick(event);
            }}
          >
            <VStack spacing={4} align="left">
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel>Enter the email of the user</FormLabel>
                  <Input placeholder="john@doe.com" type="email" />
                </FormControl>
              </Box>
              <Box>
                <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                  Invite
                </Button>
              </Box>
            </VStack>
          </form>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ManageUsers;
