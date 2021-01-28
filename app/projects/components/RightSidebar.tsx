import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { getCommentCoordinates } from "app/selectors/file";
import { useParam, useRouter } from "blitz";
import React, { ChangeEvent, FC, useState } from "react";
import { useSelector } from "react-redux";

const RightSidebar: FC = () => {
  const router = useRouter();
  const projectId = useParam("projectId", "number");
  const page = Number(router.query.page) || 0;
  const { coordinateX, coordinateY } = useSelector(getCommentCoordinates());
  const [comment, setComment] = useState<string>("");

  const commentTextAreNode = () => {
    if (!coordinateX || !coordinateY) {
      return false;
    }

    return (
      <VStack spacing={4} align="left">
        <Box>
          <FormControl
            id="name"
            isRequired
            // isDisabled={isLoading}
          >
            <FormLabel>Write your comment</FormLabel>
            <Textarea
              placeholder="Personal portfolio"
              value={comment}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setComment(e.currentTarget.value)
              }
            />
          </FormControl>
        </Box>
        <Box>
          <Button
            colorScheme="blue"
            type="submit"
            w="100%"
            // isLoading={isLoading}
          >
            Submit
          </Button>
        </Box>
      </VStack>
    );
  };

  return (
    <Box
      h="calc(100vh - 80px)"
      overflowY="scroll"
      p={8}
      bg="white"
      borderLeftWidth={1}
    >
      {commentTextAreNode()}
    </Box>
  );
};

export default RightSidebar;
