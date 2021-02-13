import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import RepliesHeading from "app/projects/components/RepliesList/Heading";
import ReplyCard from "app/projects/components/RepliesList/ReplyCard";
import ReplyForm from "app/replies/components/ReplyForm";
import createReply from "app/replies/mutations/createReply";
import getReplies from "app/replies/queries/getReplies";
import { useMutation, usePaginatedQuery, useRouter } from "blitz";
import {
  Comment,
  CommentCreateOneWithoutRepliesInput,
  UserCreateOneWithoutCommentsInput,
} from "db";
import React, { FC } from "react";

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
          <RepliesHeading replies={replies} />
        </AccordionButton>
        <AccordionPanel p={0}>
          {replies.map((reply) => {
            return <ReplyCard reply={reply} key={reply.id} />;
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
