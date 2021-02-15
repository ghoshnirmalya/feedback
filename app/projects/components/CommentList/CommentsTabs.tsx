import {
  Badge,
  Center,
  HStack,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Comment, User } from "@prisma/client";
import AllCommentsTab from "app/projects/components/CommentList/AllCommentsTab";
import UnresolvedCommentsTab from "app/projects/components/CommentList/UnresolvedCommentsTab";
import React, { FC, Suspense } from "react";

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
          <Suspense
            fallback={
              <Center minH={24}>
                <Spinner />
              </Center>
            }
          >
            <UnresolvedCommentsTab />
          </Suspense>
        </TabPanel>
        <TabPanel p={0}>
          <Suspense
            fallback={
              <Center minH={24}>
                <Spinner />
              </Center>
            }
          >
            <AllCommentsTab />
          </Suspense>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default CommentsTabs;
