import { Box, Center, Heading, Text } from "@chakra-ui/react";
import CommentBox from "app/projects/components/CommentBox";
import React, { FC } from "react";

const EmptyCommentsCard: FC = () => {
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
};

export default EmptyCommentsCard;
