import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Team, User } from "@prisma/client";
import EmptyState from "app/components/EmptyState";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import getTeams from "app/teams/queries/getTeams";
import { Link, usePaginatedQuery } from "blitz";
import React from "react";
import { MdAdd } from "react-icons/md";

const TeamsList = () => {
  const currentUser = useCurrentUser();
  const [{ teams }] = usePaginatedQuery(
    getTeams,
    {
      orderBy: { updatedAt: "desc" },
      where: {
        users: {
          some: {
            id: currentUser?.id,
          },
        },
      },
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
    }
  );

  if (!teams.length) {
    return (
      <EmptyState
        icon="/illustrations/Empty Inbox _Two Color.svg"
        heading="Create a Team"
        text="Get started by creating a new team for your organization. You can
      add projects to a team."
        buttons={[
          <Link href="/teams/new" passHref>
            <Button as="a" colorScheme="yellow" size="lg" leftIcon={<MdAdd />}>
              Create a new Team
            </Button>
          </Link>,
        ]}
      />
    );
  }

  const nameNode = (team: Team) => {
    return (
      <Box p={4}>
        <Heading size="sm">{team.name}</Heading>
      </Box>
    );
  };

  const descriptionNode = (team: Team) => {
    if (!team.description) {
      return false;
    }

    return (
      <Box p={4} borderTopWidth={1}>
        <Text fontSize="sm">{team.description}</Text>
      </Box>
    );
  };

  const userAvatarsNode = (
    team: Team & {
      users: User[];
    }
  ) => {
    if (!team.users.length) {
      return false;
    }

    const avatarsNode = () =>
      team.users.map((user) => {
        return (
          <Avatar key={user.id} src={user.avatar} name={user.name as string} />
        );
      });

    return (
      <Box p={4} borderTopWidth={1}>
        <AvatarGroup size="sm" max={5}>
          {avatarsNode()}
        </AvatarGroup>
      </Box>
    );
  };

  return (
    <Grid
      templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
      gap={8}
      w="100%"
    >
      {teams.map((team) => {
        return (
          <Link key={team.id} href={`/teams/${team.id}`} passHref>
            <Box
              as="a"
              bgColor="white"
              rounded="md"
              shadow="sm"
              borderWidth={1}
            >
              <VStack align="left" spacing={0}>
                {nameNode(team)}
                {descriptionNode(team)}
                {userAvatarsNode(team)}
              </VStack>
            </Box>
          </Link>
        );
      })}
    </Grid>
  );
};

export default TeamsList;
