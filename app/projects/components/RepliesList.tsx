import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import ReplyForm from "app/replies/components/ReplyForm";
import createReply from "app/replies/mutations/createReply";
import getReplies from "app/replies/queries/getReplies";
import { useMutation, usePaginatedQuery, useRouter } from "blitz";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {
  Comment,
  CommentCreateOneWithoutRepliesInput,
  UserCreateOneWithoutCommentsInput,
} from "db";
import React, { FC } from "react";

dayjs.extend(localizedFormat);

const ITEMS_PER_PAGE = 100;

type IProps = {
  comment: Comment;
};

const RepliesList: FC<IProps> = ({ comment }) => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ replies, hasMore }] = usePaginatedQuery(getReplies, {
    where: { commentId: comment.id },
    orderBy: { updatedAt: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });
  const [createReplyMutation, { isLoading }] = useMutation(createReply);
  const currentUser = useCurrentUser();

  if (!replies.length) {
    return null;
  }

  return (
    <Accordion allowMultiple>
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
          <ReplyForm
            initialValues={{}}
            isLoading={isLoading}
            onSubmit={async (event) => {
              try {
                await createReplyMutation({
                  data: {
                    body: event.target[0].value,
                    comment: comment as CommentCreateOneWithoutRepliesInput,
                    user: (currentUser as unknown) as UserCreateOneWithoutCommentsInput,
                  },
                });
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default RepliesList;
