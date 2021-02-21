import { Box, Center } from "@chakra-ui/react";
import { Comment } from "@prisma/client";
import { setComment } from "app/slices/comment";
import React, { FC } from "react";
import { useDispatch } from "react-redux";

type IProps = {
  comments: Comment[];
};

const Annotations: FC<IProps> = ({ comments }) => {
  const dispatch = useDispatch();

  if (!comments.length) {
    return null;
  }

  const handleSelectComment = (commentId: string) => {
    const el = document.getElementById(`js-comment-${commentId}`);

    el?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });

    dispatch(setComment(commentId));
  };

  return (
    <Box>
      {comments.map((comment, index) => {
        if (comment.isResolved) {
          return null;
        }

        return (
          <Box
            key={comment.id}
            pos="absolute"
            top={`calc(${comment.coordinateY}% - 18px)`}
            left={`calc(${comment.coordinateX}% - 18px)`}
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
              top: `calc(${comment.coordinateY}% - 22px)`,
              left: `calc(${comment.coordinateX}% - 22px)`,
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
      })}
    </Box>
  );
};

export default Annotations;
