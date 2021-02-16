import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import ManageUsers from "app/teams/components/ManageUsers";
import MembersList from "app/teams/components/MembersList";
import deleteTeam from "app/teams/mutations/deleteTeam";
import getTeam from "app/teams/queries/getTeam";
import { Link, useMutation, useParam, useQuery, useRouter } from "blitz";
import React, { FC } from "react";
import { MdSettings } from "react-icons/md";

const TeamHeading: FC = () => {
  const router = useRouter();
  const teamId = useParam("teamId", "string");
  const [team] = useQuery(
    getTeam,
    { where: { id: teamId } },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
    }
  );
  const [deleteTeamMutation] = useMutation(deleteTeam);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack spacing={8} justifyContent="space-between" w="100%">
      <Heading fontSize="2xl">{team.name}</Heading>
      <HStack spacing={4}>
        <MembersList />
        <Link href={`/teams/${teamId}/projects/new`} passHref>
          <Button as="a" colorScheme="yellow" size="sm">
            Create Project
          </Button>
        </Link>
        <ManageUsers isOpen={isOpen} onClose={onClose} />
        <Menu isLazy placement="bottom-end">
          <MenuButton as={Button} size="sm">
            <Icon as={MdSettings} />
          </MenuButton>
          <MenuList fontSize="sm">
            <MenuItem>
              <Link href={`/teams/${teamId}/edit`} passHref>
                <Box as="a" w="100%">
                  Edit
                </Box>
              </Link>
            </MenuItem>
            <MenuItem
              onClick={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteTeamMutation({ where: { id: team.id } });
                  router.push("/teams");
                }
              }}
            >
              Delete
            </MenuItem>
            <MenuItem onClick={onOpen}>Invite users</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};

export default TeamHeading;
