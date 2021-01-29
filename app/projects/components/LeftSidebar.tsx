import { Box, VStack } from "@chakra-ui/react";
import AddImageButton from "app/projects/components/AddImageButton";
import FilesList from "app/projects/components/FilesList";
import React, { FC } from "react";

const LeftSidebar: FC = () => {
  return (
    <Box
      h="calc(100vh - 80px)"
      overflowY="scroll"
      px={8}
      py={4}
      bg="white"
      borderRightWidth={1}
    >
      <VStack spacing={4}>
        <FilesList />
        <AddImageButton />
      </VStack>
    </Box>
  );
};

export default LeftSidebar;
