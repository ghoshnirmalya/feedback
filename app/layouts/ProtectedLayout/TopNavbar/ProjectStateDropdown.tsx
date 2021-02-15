import {
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import updateProject from "app/projects/mutations/updateProject";
import getProject from "app/projects/queries/getProject";
import getTeam from "app/teams/queries/getTeam";
import { invoke, useMutation, useParam, useQuery } from "blitz";
import {
  Project,
  ProjectUpdateInput,
  Team,
  TeamCreateOneWithoutProjectsInput,
} from "db";
import React, { FC } from "react";

const ProjectStateDropdown: FC = () => {
  const projectId = useParam("projectId", "string");
  const [project, { setQueryData }] = useQuery(
    getProject,
    {
      where: { id: projectId },
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
    }
  );
  const [updateProjectMutation, { isLoading }] = useMutation(updateProject);
  const currentUser = useCurrentUser();

  if (!projectId || !currentUser) {
    return null;
  }

  const handleChange = async (value: string) => {
    const teamId = project.teamId;
    const team = await invoke(getTeam, { where: { id: Number(teamId) } });

    try {
      const updated = (await updateProjectMutation({
        where: { id: project.id },
        data: {
          name: project.name,
          team: team as TeamCreateOneWithoutProjectsInput,
          isPublic: value === "public",
        } as ProjectUpdateInput,
      })) as Project & { team: Team | null };

      await setQueryData(updated);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box borderBottomWidth={1}>
      <Box borderBottomWidth={1} px={4} py={2} bg="gray.100">
        <Heading size="sm">Visibility</Heading>
      </Box>
      <Box p={4}>
        <Menu isLazy placement="bottom-start">
          <MenuButton as={Button} size="lg" w="100%" isLoading={isLoading}>
            {project.isPublic ? "Public" : "Protected"}
          </MenuButton>
          <MenuList w="100%" fontSize="sm">
            <MenuOptionGroup
              defaultValue={project.isPublic ? "public" : "protected"}
              type="radio"
              onChange={handleChange}
            >
              <MenuItemOption value="public">Public</MenuItemOption>
              <MenuItemOption value="protected">Protected</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default ProjectStateDropdown;
