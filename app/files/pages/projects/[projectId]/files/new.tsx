import Layout from "app/layouts/Layout";
import { Link, useRouter, useMutation, useParam, BlitzPage } from "blitz";
import createFile from "app/files/mutations/createFile";
import FileForm from "app/files/components/FileForm";

const NewFilePage: BlitzPage = () => {
  const router = useRouter();
  const projectId = useParam("projectId", "number") as number;
  const [createFileMutation] = useMutation(createFile);

  return (
    <div>
      <h1>Create New File</h1>

      <FileForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const file = await createFileMutation({
              data: { name: "MyName" },
              projectId,
            });
            alert("Success!" + JSON.stringify(file));
            router.push(`/projects/${projectId}/files/${file.id}`);
          } catch (error) {
            alert("Error creating file " + JSON.stringify(error, null, 2));
          }
        }}
      />

      <p>
        <Link href={`/projects/${projectId}/files`}>
          <a>Files</a>
        </Link>
      </p>
    </div>
  );
};

NewFilePage.getLayout = (page) => (
  <Layout title={"Create New File"}>{page}</Layout>
);

export default NewFilePage;
