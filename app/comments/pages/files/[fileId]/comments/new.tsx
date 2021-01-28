import Layout from "app/layouts/Layout";
import { Link, useRouter, useMutation, useParam, BlitzPage } from "blitz";
import createComment from "app/comments/mutations/createComment";
import CommentForm from "app/comments/components/CommentForm";

const NewCommentPage: BlitzPage = () => {
  const router = useRouter();
  const fileId = useParam("fileId", "number") as number;
  const [createCommentMutation] = useMutation(createComment);

  return (
    <div>
      <h1>Create New Comment</h1>

      <CommentForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const comment = await createCommentMutation({
              data: { body: "MyName" },
              fileId,
              userId: 1,
            });
            alert("Success!" + JSON.stringify(comment));
            router.push(`/files/${fileId}/comments/${comment.id}`);
          } catch (error) {
            alert("Error creating comment " + JSON.stringify(error, null, 2));
          }
        }}
      />

      <p>
        <Link href={`/files/${fileId}/comments`}>
          <a>Comments</a>
        </Link>
      </p>
    </div>
  );
};

NewCommentPage.getLayout = (page) => (
  <Layout title={"Create New Comment"}>{page}</Layout>
);

export default NewCommentPage;
