import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  VStack,
} from "@chakra-ui/react";

type CommentFormProps = {
  initialValues: any;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

const CommentForm = ({ initialValues, onSubmit }: CommentFormProps) => {
  const [comment, setComment] = useState<string>("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        onSubmit(event);
        setComment("");
      }}
    >
      <VStack spacing={4} align="left" p={8} borderBottomWidth={1}>
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
          <Button colorScheme="blue" type="submit" w="100%" size="sm">
            Submit
          </Button>
        </Box>
      </VStack>
    </form>
  );
};

export default CommentForm;
