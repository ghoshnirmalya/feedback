import { AccordionIcon, Box, Heading, HStack } from "@chakra-ui/react";
import { Reply, User } from "db";
import React, { FC } from "react";

type IProps = {
  replies: (Reply & {
    user: User | null;
  })[];
};

const RepliesHeading: FC<IProps> = ({ replies }) => {
  return (
    <Box px={4} py={2} bg="gray.100" w="100%">
      <HStack spacing={4} justifyContent="space-between">
        <Heading size="sm">View {replies.length} replies</Heading>
        <AccordionIcon />
      </HStack>
    </Box>
  );
};

export default RepliesHeading;
