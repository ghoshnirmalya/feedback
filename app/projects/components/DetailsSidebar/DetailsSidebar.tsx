import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import CommentsList from "app/projects/components/DetailsSidebar/CommentList";
import ProjectSettings from "app/projects/components/DetailsSidebar/ProjectSettings";
import React, { FC } from "react";

const DetailsSidebar: FC = () => {
  return (
    <Box
      h="calc(100vh - 80px)"
      overflowY="scroll"
      bg="white"
      borderLeftWidth={1}
    >
      <Tabs isLazy isFitted>
        <TabList>
          <Tab>Comments</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <CommentsList />
          </TabPanel>
          <TabPanel p={0}>
            <ProjectSettings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default DetailsSidebar;
