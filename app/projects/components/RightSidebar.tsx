import { Box } from "@chakra-ui/react";
import CommentBox from "app/projects/components/CommentBox";
import CommentsList from "app/projects/components/CommentsList";
import React, { FC } from "react";

const RightSidebar: FC = () => {
  return (
    <Box
      h="calc(100vh - 80px)"
      overflowY="scroll"
      bg="white"
      borderLeftWidth={1}
    >
      <CommentBox />
      <CommentsList />
    </Box>
  );
};

export default RightSidebar;
