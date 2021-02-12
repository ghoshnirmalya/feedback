import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Avatar,
  Box,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import CommentBox from "app/projects/components/CommentBox";
import getReplies from "app/replies/queries/getReplies";
import { usePaginatedQuery, useRouter } from "blitz";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import React, { FC } from "react";

dayjs.extend(localizedFormat);

const ITEMS_PER_PAGE = 100;

type IProps = {
  commentId: string;
};

const RepliesList: FC<IProps> = ({ commentId }) => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ replies, hasMore }] = usePaginatedQuery(getReplies, {
    where: { commentId },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  if (!replies.length) {
    return null;
  }

  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <AccordionButton p={0}>
          <Box px={4} py={2} bg="gray.100" w="100%">
            <HStack spacing={4} justifyContent="space-between">
              <Heading size="sm">View {replies.length} replies</Heading>
              <AccordionIcon />
            </HStack>
          </Box>
        </AccordionButton>
        <AccordionPanel p={0}>
          {replies.map((reply) => {
            return (
              <Box key={reply.id} py={4} px={12} borderTopWidth={1}>
                <VStack spacing={4} align="left">
                  <HStack spacing={2}>
                    <Avatar
                      size="sm"
                      name={reply.user.name}
                      src={reply.user.avatar}
                    />
                    <VStack spacing={0} align="left">
                      <Text fontSize="sm" fontWeight="bold">
                        {reply.user.name}
                      </Text>
                      <Text fontSize="xs">
                        {dayjs(reply.createdAt).format("LL")}
                      </Text>
                    </VStack>
                  </HStack>
                  <Text>{reply.body}</Text>
                </VStack>
              </Box>
            );
          })}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default RepliesList;
