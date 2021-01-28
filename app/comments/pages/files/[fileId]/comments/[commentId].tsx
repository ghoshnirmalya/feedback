import { Suspense } from "react";
import Layout from "app/layouts/Layout";
import {
  Link,
  useRouter,
  useQuery,
  useParam,
  BlitzPage,
  useMutation,
} from "blitz";
import getComment from "app/comments/queries/getComment";
import deleteComment from "app/comments/mutations/deleteComment";

export const Comment = () => {
  const router = useRouter();
  const commentId = useParam("commentId", "number");
  const fileId = useParam("fileId", "number");
  const [comment] = useQuery(getComment, { where: { id: commentId } });
  const [deleteCommentMutation] = useMutation(deleteComment);

  return (
    <div>
      <h1>Comment {comment.id}</h1>
      <pre>{JSON.stringify(comment, null, 2)}</pre>

      <Link href={`/files/${fileId}/comments/${comment.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteCommentMutation({ where: { id: comment.id } });
            router.push(`/files/${fileId}/comments`);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

const ShowCommentPage: BlitzPage = () => {
  const fileId = useParam("fileId", "number");

  return (
    <div>
      <p>
        <Link href={`/files/${fileId}/comments`}>
          <a>Comments</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Comment />
      </Suspense>
    </div>
  );
};

ShowCommentPage.getLayout = (page) => <Layout title={"Comment"}>{page}</Layout>;

export default ShowCommentPage;
