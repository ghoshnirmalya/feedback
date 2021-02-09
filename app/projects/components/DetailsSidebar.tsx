import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ProjectStateDropdown from "app/layouts/ProtectedLayout/TopNavbar/ProjectStateDropdown";
import CommentsList from "app/projects/components/CommentsList";
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
            <ProjectStateDropdown />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default DetailsSidebar;
