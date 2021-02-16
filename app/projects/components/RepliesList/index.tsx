import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import RepliesHeading from "app/projects/components/RepliesList/Heading";
import ReplyCard from "app/projects/components/RepliesList/ReplyCard";
import ReplyForm from "app/replies/components/ReplyForm";
import createReply from "app/replies/mutations/createReply";
import getReplies from "app/replies/queries/getReplies";
import { getCurrentUserData } from "app/selectors/currentUser";
import { useMutation, usePaginatedQuery, useRouter } from "blitz";
import {
  Comment,
  CommentCreateOneWithoutRepliesInput,
  UserCreateOneWithoutCommentsInput,
} from "db";
import React, { FC } from "react";
import { useSelector } from "react-redux";

const ITEMS_PER_PAGE = 100;

type IProps = {
  comment: Comment;
};

const RepliesList: FC<IProps> = ({ comment }) => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ replies, hasMore }] = usePaginatedQuery(
    getReplies,
    {
      where: { commentId: comment.id },
      orderBy: { updatedAt: "asc" },
      skip: ITEMS_PER_PAGE * page,
      take: ITEMS_PER_PAGE,
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
    }
  );
  const [createReplyMutation, { isLoading }] = useMutation(createReply);
  const currentUser = useSelector(getCurrentUserData());

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
