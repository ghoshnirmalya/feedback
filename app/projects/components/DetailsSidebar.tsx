import { Box } from "@chakra-ui/react";
import CommentsList from "app/projects/components/CommentsList";
import React, { FC } from "react";

const DetailsSidebar: FC = () => {
  return (
    <Box
      h="calc(100vh - 80px)"
      overflowY="scroll"
      bg="white"
      borderLeftWidth={1}
    >
      <CommentsList />
    </Box>
  );
};

export default DetailsSidebar;
