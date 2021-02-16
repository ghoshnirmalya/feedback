import { Box, Text, VStack } from "@chakra-ui/react";
import { Comment, User } from "@prisma/client";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import CommentCardHeading from "app/projects/components/DetailsSidebar/CommentList/CommentCardHeading";
import RepliesList from "app/projects/components/RepliesList";
import ReplyForm from "app/replies/components/ReplyForm";
import createReply from "app/replies/mutations/createReply";
import getReplies from "app/replies/queries/getReplies";
import { getSelectedCommentData } from "app/selectors/comment";
import { invalidateQuery, useMutation } from "blitz";
import {
  CommentCreateOneWithoutRepliesInput,
  UserCreateOneWithoutCommentsInput,
} from "db";
import React, { FC } from "react";
import { useSelector } from "react-redux";

type IProps = {
  comment: Comment & {
    user: User | null;
  };
};

const CommentCard: FC<IProps> = ({ comment }) => {
  const selectedCommentId = useSelector(getSelectedCommentData());
  const [createReplyMutation, { isLoading }] = useMutation(createReply);
  const currentUser = useCurrentUser();

  return (
    <Box
      id={`js-comment-${comment.id}`}
      borderBottomWidth={1}
      bgColor={selectedCommentId === comment.id ? "gray.100" : "white"}
    >
      <VStack spacing={0} align="left">
        <VStack spacing={4} align="left" p={4}>
          <CommentCardHeading comment={comment} />
          <Text>{comment.body}</Text>
        </VStack>
        <RepliesList comment={comment} />
        <ReplyForm
          initialValues={{}}
          isLoading={isLoading}
          onSubmit={async (event) => {
            try {
              await createReplyMutation({
                data: {
                  body: event.target[0].value,
                  comment: comment as CommentCreateOneWithoutRepliesInput,
                  user: (currentUser as unknown) as UserCreateOneWithoutCommentsInput,
                },
              });

              invalidateQuery(getReplies);
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </VStack>
    </Box>
  );
};

export default CommentCard;
