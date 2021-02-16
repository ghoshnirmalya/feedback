import { Box, Center, Text } from "@chakra-ui/react";
import {
  FileCreateOneWithoutCommentsInput,
  UserCreateOneWithoutCommentsInput,
} from "@prisma/client";
import CommentForm from "app/comments/components/CommentForm";
import createComment from "app/comments/mutations/createComment";
import { getCurrentUserData } from "app/selectors/currentUser";
import { getCommentCoordinates, getFileData } from "app/selectors/file";
import { useMutation } from "blitz";
import React, { FC } from "react";
import { useSelector } from "react-redux";

const CommentBox: FC = () => {
  const { coordinateX, coordinateY } = useSelector(getCommentCoordinates());
  const file = useSelector(getFileData());
  const [createCommentMutation] = useMutation(createComment);
  const currentUser = useSelector(getCurrentUserData());

  if (!currentUser) {
    return null;
  }

  if (!coordinateX || !coordinateY) {
    return (
      <Box h={48} p={4} borderBottomWidth={1}>
        <Center h="100%">
          <Text fontWeight="bold">Click on the image to add a comment</Text>
        </Center>
      </Box>
    );
  }

  return (
    <CommentForm
      initialValues={{}}
      onSubmit={async (event) => {
        try {
          await createCommentMutation({
            data: {
              body: event.target[0].value,
              coordinateX,
              coordinateY,
              file: (file as unknown) as FileCreateOneWithoutCommentsInput,
              user: (currentUser as unknown) as UserCreateOneWithoutCommentsInput,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }}
    />
  );
};

export default CommentBox;
