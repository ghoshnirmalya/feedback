import { Box, Center, Heading, Text } from "@chakra-ui/react";
import React, { FC } from "react";

const EmptyFilesCard: FC = () => {
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
};

export default EmptyFilesCard;
