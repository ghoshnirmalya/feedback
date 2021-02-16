import {
  Button,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import React from "react";

type ReplyFormProps = {
  initialValues: any;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
};

const ReplyForm = ({ initialValues, onSubmit, isLoading }: ReplyFormProps) => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        onSubmit(event);
        event.currentTarget.reset();
      }}
    >
      <FormControl id="reply" isRequired borderTopWidth={1}>
        <InputGroup>
          <Input
            placeholder="Write your reply"
            variant="filled"
            rounded="none"
            pr={16}
            isDisabled={isLoading}
          />
          <InputRightElement width={16}>
            <Button
              colorScheme="yellow"
              type="submit"
              size="sm"
              isLoading={isLoading}
            >
              Send
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  );
};

export default ReplyForm;
