import ProjectForm from "app/projects/components/ProjectForm";
import updateProject from "app/projects/mutations/updateProject";
import getProject from "app/projects/queries/getProject";
import { useMutation, useParam, useQuery, useRouter } from "blitz";
import React, { FC } from "react";

const EditProjectForm: FC = () => {
  const router = useRouter();
  const projectId = useParam("projectId", "number");
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
        try {
          const updated = await updateProjectMutation({
            where: { id: project.id },
            data: { name: event.target[0].value },
          });

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
