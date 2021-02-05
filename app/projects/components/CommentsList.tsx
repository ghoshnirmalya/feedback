import {
  Avatar,
  Box,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import getComments from "app/comments/queries/getComments";
import { getSelectedCommentData } from "app/selectors/comment";
import { getFileData } from "app/selectors/file";
import { usePaginatedQuery, useRouter } from "blitz";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import CommentBox from "app/projects/components/CommentBox";

const ITEMS_PER_PAGE = 100;

const CommentsList: FC = () => {
  const file = useSelector(getFileData());
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ comments, hasMore }] = usePaginatedQuery(getComments, {
    where: { file: { id: file.id } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });
  const selectedCommentId = useSelector(getSelectedCommentData());

  if (!comments.length) {
    return (
      <>
        <Box borderBottomWidth={1} px={8} py={2} bg="gray.100">
          <Heading size="sm">Comments</Heading>
        </Box>
        <Box h={48} px={8} py={4} borderBottomWidth={1}>
          <Center h="100%">
            <Heading size="md" textAlign="center">
              No comments yet!
            </Heading>
          </Center>
        </Box>
      </>
    );
  }

  return (
    <Box>
      <Box borderBottomWidth={1} px={8} py={2} bg="gray.100">
        <Heading size="sm">Comments</Heading>
      </Box>
      <Box id="js-comment-form-container">
        <CommentBox />
      </Box>
      {comments.map((comment) => {
        return (
          <Box
            key={comment.id}
            id={`js-comment-${comment.id}`}
            px={8}
            py={4}
            borderBottomWidth={1}
            bgColor={selectedCommentId === comment.id ? "gray.100" : "white"}
          >
            <VStack spacing={4} align="left">
              <HStack spacing={2}>
                <Avatar size="sm" />
                <VStack spacing={1} align="left">
                  <Text fontSize="sm">{comment.user.email}</Text>
                  <Text fontSize="xs">{comment.createdAt.getTime()}</Text>
                </VStack>
              </HStack>
              <Text>{comment.body}</Text>
            </VStack>
          </Box>
        );
      })}
    </Box>
  );
};

export default CommentsList;
