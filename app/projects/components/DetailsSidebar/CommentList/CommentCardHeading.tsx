import {
  Avatar,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import {
  Comment,
  FileCreateOneWithoutCommentsInput,
  User,
  UserCreateOneWithoutCommentsInput,
} from "@prisma/client";
import updateComment from "app/comments/mutations/updateComment";
import getComments from "app/comments/queries/getComments";
import getFile from "app/files/queries/getFile";
import { invalidateQuery, invoke, useMutation } from "blitz";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import React, { FC } from "react";
import {
  MdDelete,
  MdDone,
  MdEdit,
  MdNotInterested,
  MdReport,
  MdSettings,
} from "react-icons/md";

dayjs.extend(localizedFormat);

type IProps = {
  comment: Comment & {
    user: User;
  };
};

const CommentCardHeading: FC<IProps> = ({ comment }) => {
  const [updateCommentMutation, { isLoading, isError }] = useMutation(
    updateComment
  );

  const handleResolveAction = async (isResolved: boolean) => {
    try {
      const file = await invoke(getFile, {
        where: { id: comment.fileId },
      });

      await updateCommentMutation({
        where: { id: comment.id },
        data: {
          body: comment.body,
          coordinateX: comment.coordinateX,
          coordinateY: comment.coordinateY,
          isResolved,
          file: (file as unknown) as FileCreateOneWithoutCommentsInput,
          user: (comment.user as unknown) as UserCreateOneWithoutCommentsInput,
        },
      });

      invalidateQuery(getComments);
    } catch (error) {
      console.log(error);
    }
  };

  const resolveButtonNode = () => {
    if (comment.isResolved) {
      return false;
    }

    return (
      <Tooltip
        label="Mark as resolved"
        aria-label="Mark as resolved"
        placement="top"
      >
        <IconButton
          aria-label="Mark as resolved"
          icon={<MdDone />}
          variant="ghost"
          size="sm"
          isLoading={isLoading}
          onClick={() => handleResolveAction(true)}
        />
      </Tooltip>
    );
  };

  const unresolveButtonNode = () => {
    if (!comment.isResolved) {
      return false;
    }

    return (
      <Tooltip
        label="Mark as unresolved"
        aria-label="Mark as unresolved"
        placement="top"
      >
        <IconButton
          aria-label="Mark as unresolved"
          icon={<MdNotInterested />}
          variant="ghost"
          size="sm"
          isLoading={isLoading}
          onClick={() => handleResolveAction(false)}
        />
      </Tooltip>
    );
  };

  return (
    <HStack spacing={2} justifyContent="space-between">
      <HStack spacing={2}>
        <Avatar size="sm" name={comment.user.name} src={comment.user.avatar} />
        <VStack spacing={0} align="left">
          <Text fontSize="sm" fontWeight="bold">
            {comment.user.name}
          </Text>
          <Text fontSize="xs">{dayjs(comment.createdAt).format("LL")}</Text>
        </VStack>
      </HStack>
      <HStack spacing={0}>
        {resolveButtonNode()}
        {unresolveButtonNode()}
        <Menu isLazy>
          <Tooltip label="Settings" aria-label="Settings" placement="top">
            <MenuButton
              as={IconButton}
              aria-label="Settings"
              icon={<MdSettings />}
              variant="ghost"
              size="sm"
            />
          </Tooltip>
          <MenuList fontSize="sm">
            <MenuItem icon={<MdEdit />}>Edit</MenuItem>
            <MenuItem icon={<MdReport />}>Report</MenuItem>
            <MenuItem icon={<MdDelete />} color="red.500">
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};

export default CommentCardHeading;
