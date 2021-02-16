import { Box, Center, Image, Spinner, Text } from "@chakra-ui/react";
import getComments from "app/comments/queries/getComments";
import EmptyState from "app/components/EmptyState";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import AddImageButton from "app/projects/components/AddImageButton";
import { getCommentCoordinates, getFileData } from "app/selectors/file";
import { setComment } from "app/slices/comment";
import { setCoordinates } from "app/slices/file";
import { usePaginatedQuery, useRouter } from "blitz";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ITEMS_PER_PAGE = 100;

const ContentArea: FC = () => {
  const [annotation, setAnnotation] = useState({ x: 0, y: 0 });
  const { id, url, name, height, width } = useSelector(getFileData());
  const dispatch = useDispatch();
  const { coordinateX, coordinateY } = useSelector(getCommentCoordinates());
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ comments, hasMore }] = usePaginatedQuery(
    getComments,
    {
      where: { file: { id: (id as unknown) as string } },
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
  const currentUser = useCurrentUser();

  const handleSetPointer = (e: any) => {
    if (e.target.classList.contains("js-annotation")) {
      dispatch(
        setCoordinates({
          coordinateX: null,
          coordinateY: null,
        })
      );

      return false;
    }

    const el = document.getElementById("js-comment-form-container");

    el?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });

    dispatch(setComment(null));

    // Calcualate co-ordinates in percentages in order to support responsive mode
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.x;
    const offsetY = e.clientY - rect.y;

    const x = (offsetX / rect.width) * 100;
    const y = (offsetY / rect.height) * 100;

    setAnnotation({
      x,
      y,
    });

    // Open the comment box to let the user add comments
    dispatch(setCoordinates({ coordinateX: x, coordinateY: y }));
  };

  const handleSelectComment = (commentId: string) => {
    const el = document.getElementById(`js-comment-${commentId}`);

    el?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });

    dispatch(setComment(commentId));
  };

  const annotationsNode = () => {
    if (!comments.length) {
      return false;
    }

    return comments.map((comment, index) => {
      if (comment.isResolved) {
        return false;
      }

      return (
        <Box
          key={comment.id}
          pos="absolute"
          top={`${comment.coordinateY - 1.5}%`}
          left={`${comment.coordinateX - 1.5}%`}
          w={8}
          h={8}
          bgColor="yellow.100"
          borderRadius="50%"
          borderWidth={2}
          borderColor="yellow.900"
          onClick={() => handleSelectComment(comment.id)}
          _hover={{
            w: 10,
            h: 10,
            top: `${comment.coordinateY - 2.35}%`,
            left: `${comment.coordinateX - 1.9}%`,
          }}
        >
          <Center
            h="100%"
            fontWeight="bold"
            color="yellow.900"
            className="js-annotation"
          >
            {index + 1}
          </Center>
        </Box>
      );
    });
  };

  const annotatorPointerNode = () => {
    if (!coordinateX || !coordinateY) {
      return false;
    }

    return (
      <Box
        pos="absolute"
        top={`${annotation.y - 1.5}%`}
        left={`${annotation.x - 1.5}%`}
        w={4}
        h={4}
        bgColor="yellow.100"
        borderRadius="50%"
        borderWidth={2}
        borderColor="yellow.900"
      />
    );
  };

  const imageNode = () => {
    if (!url) {
      return (
        <Center h="100%">
          <EmptyState
            heading="No image selected"
            text={
              currentUser
                ? "Select an image from the left sidebar or upload a new image"
                : "Select an image from the left sidebar"
            }
            buttons={[<AddImageButton key="addImageButton" />]}
          />
        </Center>
      );
    }

    return (
      <Center overflowY="auto" mx="auto" w="100%" h="100%">
        <Center
          pos="relative"
          m="0 auto"
          width={width}
          height={height}
          _hover={{
            cursor: "pointer",
          }}
        >
          <Image
            src={url}
            alt={name}
            maxW="fit-content"
            fallback={
              <Center p={4} w="100%">
                <Spinner />
              </Center>
            }
          />
          <Box
            pos="absolute"
            inset="0"
            id="js-image"
            onClick={handleSetPointer}
          >
            {annotationsNode()}
            {annotatorPointerNode()}
          </Box>
        </Center>
      </Center>
    );
  };

  return (
    <Center h="calc(100vh - 80px)" overflow="hidden" bg="gray.100">
      <Center h="100%" w="100%" overflow="scroll" alignItems="flex-start" p={8}>
        {imageNode()}
      </Center>
    </Center>
  );
};

export default ContentArea;
