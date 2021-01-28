import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import getComments from "app/comments/queries/getComments";
import { getFileData } from "app/selectors/file";
import { usePaginatedQuery, useRouter } from "blitz";
import React, { FC } from "react";
import { useSelector } from "react-redux";

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

  return (
    <VStack align="left">
      {comments.map((comment, index) => {
        return (
          <Box key={index} p={8} borderBottomWidth={1}>
            <HStack spacing={4}>
              <Avatar size="sm" />
              <Text>{comment.body}</Text>
            </HStack>
          </Box>
        );
      })}
    </VStack>
  );
};

export default CommentsList;
