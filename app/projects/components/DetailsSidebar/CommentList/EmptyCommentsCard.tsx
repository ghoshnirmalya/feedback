import { Box, Center, Heading } from "@chakra-ui/react";
import EmptyState from "app/core/components/EmptyState";
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
      <Box p={4} borderBottomWidth={1}>
        <Center h="100%">
          <EmptyState
            heading="No comments yet."
            text="Click on the image to add a comment"
          />
        </Center>
      </Box>
    </>
  );
};

export default EmptyCommentsCard;
