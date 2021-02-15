import { Box, Text, VStack } from "@chakra-ui/react";
import { Comment, User } from "@prisma/client";
import CommentCardHeading from "app/projects/components/DetailsSidebar/CommentList/CommentCardHeading";
import RepliesList from "app/projects/components/RepliesList";
import { getSelectedCommentData } from "app/selectors/comment";
import React, { FC } from "react";
import { useSelector } from "react-redux";

type IProps = {
  comment: Comment & {
    user: User;
  };
};

const CommentCard: FC<IProps> = ({ comment }) => {
  const selectedCommentId = useSelector(getSelectedCommentData());

  return (
    <Box
      id={`js-comment-${comment.id}`}
      borderBottomWidth={1}
      bgColor={selectedCommentId === comment.id ? "gray.100" : "white"}
    >
      <VStack spacing={4} align="left">
        <VStack spacing={4} align="left" p={4}>
          <CommentCardHeading comment={comment} />
          <Text>{comment.body}</Text>
        </VStack>
        <RepliesList comment={comment} />
      </VStack>
    </Box>
  );
};

export default CommentCard;
