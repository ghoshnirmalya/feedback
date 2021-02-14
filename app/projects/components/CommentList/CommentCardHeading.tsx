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
import { Comment, User } from "@prisma/client";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import React, { FC } from "react";
import { MdDelete, MdDone, MdEdit, MdReport, MdSettings } from "react-icons/md";

dayjs.extend(localizedFormat);

type IProps = {
  comment: Comment & {
    user: User;
  };
};

const CommentCardHeading: FC<IProps> = ({ comment }) => {
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
      <HStack spacing={2}>
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
          />
        </Tooltip>
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
