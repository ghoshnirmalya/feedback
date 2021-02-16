import { Box, Heading } from "@chakra-ui/react";
import getComments from "app/comments/queries/getComments";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import CommentBox from "app/projects/components/CommentBox";
import CommentsTabs from "app/projects/components/DetailsSidebar/CommentList/CommentsTabs";
import NoCommentsCard from "app/projects/components/DetailsSidebar/CommentList/EmptyCommentsCard";
import EmptyFilesCard from "app/projects/components/DetailsSidebar/CommentList/EmptyFilesCard";
import { getFileData } from "app/selectors/file";
import { usePaginatedQuery, useRouter } from "blitz";
import React, { FC } from "react";
import { useSelector } from "react-redux";

const ITEMS_PER_PAGE = 100;

const CommentsList: FC = () => {
  const file = useSelector(getFileData());
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ comments, hasMore }] = usePaginatedQuery(
    getComments,
    {
      where: { file: { id: (file.id as unknown) as string } },
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
  const currentUser = useCurrentUser();

  if (!file.url) {
    return <EmptyFilesCard />;
  }

  if (!comments.length) {
    return <NoCommentsCard />;
  }

  const headingNode = () => {
    if (!currentUser) {
      return false;
    }

    return (
      <>
        <Box borderBottomWidth={1} px={4} py={2} bg="gray.100">
          <Heading size="sm">Add a new comment</Heading>
        </Box>
        <Box id="js-comment-form-container">
          <CommentBox />
        </Box>
      </>
    );
  };

  return (
    <Box>
      {headingNode()}
      <Box borderBottomWidth={1} px={4} py={2} bg="gray.100">
        <Heading size="sm">Comments</Heading>
      </Box>
      <CommentsTabs />
    </Box>
  );
};

export default CommentsList;
