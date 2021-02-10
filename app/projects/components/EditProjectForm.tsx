import ProjectForm from "app/projects/components/ProjectForm";
import updateProject from "app/projects/mutations/updateProject";
import getProject from "app/projects/queries/getProject";
import getTeam from "app/teams/queries/getTeam";
import { invoke, useMutation, useParam, useQuery, useRouter } from "blitz";
import { Project, Team, TeamCreateOneWithoutProjectsInput } from "db";
import React, { FC } from "react";

const EditProjectForm: FC = () => {
  const router = useRouter();
  const projectId = useParam("projectId", "string");
  const [project, { setQueryData }] = useQuery(getProject, {
    where: { id: projectId },
  });
  const [updateProjectMutation, { isLoading, isError }] = useMutation(
    updateProject
  );

  return (
    <ProjectForm
      initialValues={project}
      isLoading={isLoading}
      isError={isError}
      onSubmit={async (event) => {
        const teamId = event.target[1].value;
        const team = await invoke(getTeam, { where: { id: Number(teamId) } });

        try {
          const updated = (await updateProjectMutation({
            where: { id: project.id },
            data: {
              name: event.target[0].value,
              team: team as TeamCreateOneWithoutProjectsInput,
            },
          })) as Project & { team: Team | null };

          await setQueryData(updated);

          router.push(`/projects/${updated.id}`);
        } catch (error) {
          console.log(error);
        }
      }}
    />
  );
};

export default EditProjectForm;
