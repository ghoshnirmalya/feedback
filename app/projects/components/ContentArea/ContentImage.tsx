import { Box, Center, Image, Spinner } from "@chakra-ui/react";
import getComments from "app/comments/queries/getComments";
import EmptyState from "app/components/EmptyState";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import calculateImageHost from "app/lib/calculateImageHost";
import AddImageButton from "app/projects/components/AddImageButton";
import AnnotationPointer from "app/projects/components/ContentArea/AnnotationPointer";
import Annotations from "app/projects/components/ContentArea/Annotations";
import { getCommentCoordinates, getFileData } from "app/selectors/file";
import { setComment } from "app/slices/comment";
import { setCoordinates } from "app/slices/file";
import { usePaginatedQuery, useRouter } from "blitz";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ITEMS_PER_PAGE = 100;

const ContentImage: FC = () => {
  const file = useSelector(getFileData());
  const dispatch = useDispatch();
  const router = useRouter();
  const [annotation, setAnnotation] = useState({ x: 0, y: 0 });
  const { coordinateX, coordinateY } = useSelector(getCommentCoordinates());
  const page = Number(router.query.page) || 0;
  const [{ comments, hasMore }] = usePaginatedQuery(
    getComments,
    {
      where: { file: { id: (file?.id as unknown) as string } },
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

  if (!file?.url) {
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

  return (
    <Box
      pos="relative"
      _hover={{
        cursor: "pointer",
      }}
      onClick={handleSetPointer}
    >
      <Image
        id="js-image"
        src={calculateImageHost(file)}
        alt={file?.name}
        maxH="calc(100vh - 80px - 4rem)"
        fallback={
          <Center p={4} w="100%">
            <Spinner />
          </Center>
        }
      />
      <Annotations comments={comments} />
      <AnnotationPointer
        coordinateX={coordinateX}
        coordinateY={coordinateY}
        annotation={annotation}
      />
    </Box>
  );
};

export default ContentImage;
