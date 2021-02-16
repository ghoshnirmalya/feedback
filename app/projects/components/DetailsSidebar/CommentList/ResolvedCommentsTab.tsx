import { Box, Center, Spinner } from "@chakra-ui/react";
import getComments from "app/comments/queries/getComments";
import EmptyState from "app/components/EmptyState";
import CommentCard from "app/projects/components/DetailsSidebar/CommentList/CommentCard";
import { getFileData } from "app/selectors/file";
import { usePaginatedQuery, useRouter } from "blitz";
import React, { FC } from "react";
import { useSelector } from "react-redux";

const ITEMS_PER_PAGE = 100;

const ResolvedCommentsTab: FC = () => {
  const file = useSelector(getFileData());
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ comments, hasMore }] = usePaginatedQuery(
    getComments,
    {
      where: { file: { id: (file.id as unknown) as string }, isResolved: true },
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

  if (!comments.length) {
    return (
      <EmptyState
        heading="No comments yet."
        text="Click on the image to add a comment"
      />
    );
  }

  return (
    <Box>
      {comments.map((comment) => {
        return <CommentCard comment={comment} key={comment.id} />;
      })}
    </Box>
  );
};

export default ResolvedCommentsTab;
