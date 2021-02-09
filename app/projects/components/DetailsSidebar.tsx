import { Box } from "@chakra-ui/react";
import ProjectStateDropdown from "app/layouts/ProtectedLayout/TopNavbar/ProjectStateDropdown";
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
      <ProjectStateDropdown />
      <CommentsList />
    </Box>
  );
};

export default DetailsSidebar;
