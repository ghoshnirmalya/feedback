import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { setCoordinates } from "app/slices/file";
import { useDispatch } from "react-redux";

type CommentFormProps = {
  initialValues: any;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

const CommentForm = ({ initialValues, onSubmit }: CommentFormProps) => {
  const [comment, setComment] = useState<string>("");
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(
      setCoordinates({
        coordinateX: null,
        coordinateY: null,
      })
    );
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        onSubmit(event);
        setComment("");
      }}
    >
      <VStack spacing={2} align="left" p={4} borderBottomWidth={1}>
        <Box>
          <FormControl id="name" isRequired>
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
          <HStack spacing={2} w="100%">
            <Button colorScheme="blue" type="submit" size="sm">
              Save
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              variant="ghost"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </HStack>
        </Box>
      </VStack>
    </form>
  );
};

export default CommentForm;
