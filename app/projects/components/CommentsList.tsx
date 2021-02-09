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
import CommentBox from "app/projects/components/CommentBox";
import { getSelectedCommentData } from "app/selectors/comment";
import { getFileData } from "app/selectors/file";
import { usePaginatedQuery, useRouter } from "blitz";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import React, { FC } from "react";
import { useSelector } from "react-redux";

dayjs.extend(localizedFormat);

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

  if (!file.url) {
    return (
      <>
        <Box borderBottomWidth={1} px={4} py={2} bg="gray.100">
          <Heading size="sm">Comments</Heading>
        </Box>
        <Box h={48} p={4} borderBottomWidth={1}>
          <Center h="100%">
            <Text fontWeight="bold">Select a file to add your comments!</Text>
          </Center>
        </Box>
      </>
    );
  }

  if (!comments.length) {
    return (
      <>
        <Box borderBottomWidth={1} px={4} py={2} bg="gray.100">
          <Heading size="sm">Comments</Heading>
        </Box>
        <Box id="js-comment-form-container">
          <CommentBox />
        </Box>
        <Box h={48} p={4} borderBottomWidth={1}>
          <Center h="100%">
            <Text fontWeight="bold">No comments yet!</Text>
          </Center>
        </Box>
      </>
    );
  }

  return (
    <Box>
      <Box borderBottomWidth={1} px={4} py={2} bg="gray.100">
        <Heading size="sm">Add a new comment</Heading>
      </Box>
      <Box id="js-comment-form-container">
        <CommentBox />
      </Box>
      <Box borderBottomWidth={1} px={4} py={2} bg="gray.100">
        <Heading size="sm">Comments</Heading>
      </Box>
      {comments.map((comment) => {
        return (
          <Box
            key={comment.id}
            id={`js-comment-${comment.id}`}
            p={4}
            borderBottomWidth={1}
            bgColor={selectedCommentId === comment.id ? "gray.100" : "white"}
          >
            <VStack spacing={4} align="left">
              <HStack spacing={2}>
                <Avatar
                  size="sm"
                  name={comment.user.name}
                  src={comment.user.avatar}
                />
                <VStack spacing={0} align="left">
                  <Text fontSize="sm" fontWeight="bold">
                    {comment.user.name}
                  </Text>
                  <Text fontSize="xs">
                    {dayjs(comment.createdAt).format("LL")}
                  </Text>
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
