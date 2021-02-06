import ProjectForm from "app/projects/components/ProjectForm";
import createProject from "app/projects/mutations/createProject";
import getTeam from "app/teams/queries/getTeam";
import { invoke, useMutation, useRouter } from "blitz";
import { TeamCreateOneWithoutProjectsInput } from "db";
import React, { FC } from "react";

const CreateProjectForm: FC = () => {
  const router = useRouter();
  const [createProjectMutation, { isLoading, isError }] = useMutation(
    createProject
  );

  return (
    <ProjectForm
      initialValues={{}}
      isLoading={isLoading}
      isError={isError}
      onSubmit={async (event) => {
        const teamId = event.target[1].value;
        const team = await invoke(getTeam, { where: { id: Number(teamId) } });

        try {
          const project = await createProjectMutation({
            data: {
              name: event.target[0].value,
              team: team as TeamCreateOneWithoutProjectsInput,
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
