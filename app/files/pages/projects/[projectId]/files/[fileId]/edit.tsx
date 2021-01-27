import { Suspense } from "react";
import Layout from "app/layouts/Layout";
import {
  Link,
  useRouter,
  useQuery,
  useMutation,
  useParam,
  BlitzPage,
} from "blitz";
import getFile from "app/files/queries/getFile";
import updateFile from "app/files/mutations/updateFile";
import FileForm from "app/files/components/FileForm";

export const EditFile = () => {
  const router = useRouter();
  const fileId = useParam("fileId", "number");
  const projectId = useParam("projectId", "number") as number;
  const [file, { setQueryData }] = useQuery(getFile, { where: { id: fileId } });
  const [updateFileMutation] = useMutation(updateFile);

  return (
    <div>
      <h1>Edit File {file.id}</h1>
      <pre>{JSON.stringify(file)}</pre>

      <FileForm
        initialValues={file}
        onSubmit={async () => {
          try {
            const updated = await updateFileMutation({
              where: { id: file.id },
              data: { name: "MyNewName" },
              projectId,
            });
            await setQueryData(updated);
            alert("Success!" + JSON.stringify(updated));
            router.push(`/projects/${projectId}/files/${updated.id}`);
          } catch (error) {
            console.log(error);
            alert("Error editing file " + JSON.stringify(error, null, 2));
          }
        }}
      />
    </div>
  );
};

const EditFilePage: BlitzPage = () => {
  const projectId = useParam("projectId", "number");

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditFile />
      </Suspense>

      <p>
        <Link href={`/projects/${projectId}/files`}>
          <a>Files</a>
        </Link>
      </p>
    </div>
  );
};

EditFilePage.getLayout = (page) => <Layout title={"Edit File"}>{page}</Layout>;

export default EditFilePage;
