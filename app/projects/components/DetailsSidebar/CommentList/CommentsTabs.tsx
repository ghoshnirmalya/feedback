import {
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
import ResolvedCommentsTab from "app/projects/components/DetailsSidebar/CommentList/ResolvedCommentsTab";
import UnresolvedCommentsTab from "app/projects/components/DetailsSidebar/CommentList/UnresolvedCommentsTab";
import React, { FC, Suspense } from "react";

const CommentsTabs: FC = () => {
  return (
    <Tabs isFitted isLazy>
      <TabList>
        <Tab>
          <HStack spacing={2}>
            <Text>Unresolved</Text>
          </HStack>
        </Tab>
        <Tab>
          <HStack spacing={2}>
            <Text>All</Text>
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
            <ResolvedCommentsTab />
          </Suspense>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default CommentsTabs;
