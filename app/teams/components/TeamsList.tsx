import { Box, Center, Grid } from "@chakra-ui/react";
import getTeams from "app/teams/queries/getTeams";
import { Link, usePaginatedQuery } from "blitz";
import React from "react";

const TeamsList = () => {
  const [{ teams }] = usePaginatedQuery(getTeams, {
    orderBy: { updatedAt: "desc" },
  });

  return (
    <Grid
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(4, 1fr)",
      ]}
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
              <Center p={4} fontWeight="bold" h={48}>
                {team.name}
              </Center>
            </Box>
          </Link>
        );
      })}
    </Grid>
  );
};

export default TeamsList;
