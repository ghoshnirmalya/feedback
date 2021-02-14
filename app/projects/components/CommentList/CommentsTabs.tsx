import {
  Badge,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Comment, User } from "@prisma/client";
import CommentCard from "app/projects/components/CommentList/CommentCard";
import React, { FC } from "react";

type IProps = {
  comments: (Comment & {
    user: User;
  })[];
};

const CommentsTabs: FC<IProps> = ({ comments }) => {
  return (
    <Tabs isFitted isLazy>
      <TabList>
        <Tab>
          <HStack spacing={2}>
            <Text>Unresolved</Text>
            <Badge>{comments.length}</Badge>
          </HStack>
        </Tab>
        <Tab>
          <HStack spacing={2}>
            <Text>All</Text>
            <Badge>{comments.length}</Badge>
          </HStack>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel p={0}>
          {comments.map((comment) => {
            return <CommentCard comment={comment} key={comment.id} />;
          })}
        </TabPanel>
        <TabPanel p={0}>All comments</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default CommentsTabs;
