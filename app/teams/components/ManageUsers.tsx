import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import updateTeam from "app/teams/mutations/updateTeam";
import getTeam from "app/teams/queries/getTeam";
import getUser from "app/users/queries/getUser";
import { invoke, useMutation, useParam, useQuery } from "blitz";
import { Prisma, Project, Team, User } from "db";
import React, { FC, FormEvent } from "react";

type IProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ManageUsers: FC<IProps> = ({ isOpen, onClose }) => {
  const teamId = useParam("teamId", "string");
  const [team, { setQueryData }] = useQuery(
    getTeam,
    {
      where: { id: teamId },
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
    }
  );
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
          users: { id: user.id } as Prisma.UserUpdateManyWithoutTeamsInput,
        },
      })) as Team & { users: User[]; projects: Project[] };

      await setQueryData(updated);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottomWidth={1}>Invite users</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            id="invite-users-form"
            onSubmit={(event) => {
              event.preventDefault();

              handleClick(event);
            }}
          >
            <FormControl id="email" isRequired>
              <FormLabel>Enter the email of the user</FormLabel>
              <Input placeholder="john@doe.com" type="email" />
              <FormHelperText>
                Enter the email of the user whom you want to invite to your
                project.
              </FormHelperText>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter borderTopWidth={1}>
          <HStack spacing={4} w="100%">
            <Button
              colorScheme="yellow"
              type="submit"
              isLoading={isLoading}
              size="sm"
              form="invite-users-form"
            >
              Invite
            </Button>
            <Button onClick={onClose} size="sm">
              Close
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ManageUsers;
