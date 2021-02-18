import ProjectForm from "app/projects/components/ProjectForm";
import createProject from "app/projects/mutations/createProject";
import getTeam from "app/teams/queries/getTeam";
import { useMutation, useParam, useQuery, useRouter } from "blitz";
import { Prisma } from "db";
import React, { FC } from "react";

const CreateProjectForm: FC = () => {
  const router = useRouter();
  const [createProjectMutation, { isLoading, isError }] = useMutation(
    createProject
  );
  const teamId = useParam("teamId", "string");
  const [team] = useQuery(
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

  return (
    <ProjectForm
      initialValues={{}}
      isLoading={isLoading}
      isError={isError}
      onSubmit={async (event) => {
        try {
          const project = await createProjectMutation({
            data: {
              name: event.target[0].value,
              team: team as Prisma.TeamCreateNestedOneWithoutProjectsInput,
            },
          });

          router.push(`/projects/${project.id}`);
        } catch (error) {
          console.log(error);
        }
      }}
    />
  );
};

export default CreateProjectForm;
