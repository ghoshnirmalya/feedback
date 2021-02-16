import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Reply, User } from "db";
import React, { FC } from "react";

dayjs.extend(localizedFormat);

type IProps = {
  reply: Reply & {
    user: User | null;
  };
};

const ReplyCard: FC<IProps> = ({ reply }) => {
  return (
    <Box p={4} borderTopWidth={1}>
      <VStack spacing={4} align="left">
        <HStack spacing={2}>
          <Avatar size="sm" name={reply.user?.name} src={reply.user?.avatar} />
          <VStack spacing={0} align="left">
            <Text fontSize="sm" fontWeight="bold">
              {reply.user?.name}
            </Text>
            <Text fontSize="xs">{dayjs(reply.createdAt).format("LL")}</Text>
          </VStack>
        </HStack>
        <Text>{reply.body}</Text>
      </VStack>
    </Box>
  );
};

export default ReplyCard;
