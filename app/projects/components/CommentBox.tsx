import CommentForm from "app/comments/components/CommentForm";
import createComment from "app/comments/mutations/createComment";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import { getCommentCoordinates, getFileData } from "app/selectors/file";
import { useMutation } from "blitz";
import React, { FC } from "react";
import { useSelector } from "react-redux";

const CommentBox: FC = () => {
  const { coordinateX, coordinateY } = useSelector(getCommentCoordinates());
  const file = useSelector(getFileData());
  const [createCommentMutation] = useMutation(createComment);
  const currentUser = useCurrentUser();

  if (!coordinateX || !coordinateY) {
    return null;
  }

  return (
    <CommentForm
      initialValues={{}}
      onSubmit={async (event) => {
        try {
          await createCommentMutation({
            data: { body: event.target[0].value },
            fileId: file.id,
            userId: currentUser?.id as number,
          });
        } catch (error) {
          console.log(error);
        }
      }}
    />
  );
};

export default CommentBox;
