import {
  Box,
  Center,
  Grid,
  Heading,
  Spinner,
  Text,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import RadioCards from "app/components/RadioCards";
import updateProject from "app/projects/mutations/updateProject";
import getProject from "app/projects/queries/getProject";
import { getCurrentUserData } from "app/selectors/currentUser";
import getTeam from "app/teams/queries/getTeam";
import { invoke, useMutation, useParam, useQuery } from "blitz";
import {
  Project,
  ProjectUpdateInput,
  Team,
  TeamCreateOneWithoutProjectsInput,
} from "db";
import React, { FC } from "react";
import { MdLock, MdPublic } from "react-icons/md";
import { useSelector } from "react-redux";

const ProjectStateRadio: FC = () => {
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
  const currentUser = useSelector(getCurrentUserData());

  const options = [
    {
      icon: <MdPublic />,
      label: "Public",
      value: "public",
      helpText:
        "Anyone with the link will be able to view this project as well as all the comments and replies.",
    },
    {
      icon: <MdLock />,
      label: "Protected",
      value: "protected",
      helpText:
        "Only people who belong to your team will be able to view this project.",
    },
  ];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "projectState",
    value: project.isPublic ? "public" : "protected",
    onChange: (value: string) => {
      handleChange(value);
    },
  });
  const group = getRootProps();

  if (!projectId || !currentUser) {
    return null;
  }

  const handleChange = async (value: string) => {
    const teamId = project.teamId;
    const team = await invoke(getTeam, { where: { id: teamId } });

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

  const radioButtonsNode = () => {
    return (
      <Grid
        {...group}
        gridAutoFlow="column"
        templateColumns={["repeat(2, 1fr)"]}
        gap={4}
        w="100%"
      >
        {options.map((value) => {
          const radio = getRadioProps({
            value: value.value,
            disabled: isLoading,
          });

          if (isLoading) {
            return (
              <Box borderWidth={1} p={20} h="100%" key={value.value}>
                <Center>
                  <Spinner />
                </Center>
              </Box>
            );
          }

          return (
            <RadioCards radio={radio} value={value} key={value.value}>
              <VStack spacing={2}>
                <Box fontSize="4xl">{value.icon}</Box>
                <Heading fontSize="2xl" fontWeight="bold">
                  {value.label}
                </Heading>
                <Text>{value.helpText}</Text>
              </VStack>
            </RadioCards>
          );
        })}
      </Grid>
    );
  };

  return (
    <Box borderBottomWidth={1}>
      <Box borderBottomWidth={1} px={4} py={2} bg="gray.100">
        <Heading size="sm">Visibility</Heading>
      </Box>
      <Box p={4}>{radioButtonsNode()}</Box>
    </Box>
  );
};

export default ProjectStateRadio;
