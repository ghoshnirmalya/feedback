import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import RepliesHeading from "app/projects/components/RepliesList/Heading";
import ReplyCard from "app/projects/components/RepliesList/ReplyCard";
import getReplies from "app/replies/queries/getReplies";
import { usePaginatedQuery, useRouter } from "blitz";
import { Comment } from "db";
import React, { FC } from "react";

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
      orderBy: { updatedAt: "desc" },
      skip: ITEMS_PER_PAGE * page,
      take: ITEMS_PER_PAGE,
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
    }
  );

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
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default RepliesList;
