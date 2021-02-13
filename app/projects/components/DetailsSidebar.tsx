import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Heading,
} from "@chakra-ui/react";
import ProjectStateDropdown from "app/layouts/ProtectedLayout/TopNavbar/ProjectStateDropdown";
import CommentsList from "app/projects/components/CommentList";
import { Link, useParam } from "blitz";
import React, { FC } from "react";

const DetailsSidebar: FC = () => {
  const projectId = useParam("projectId", "string");

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
            <Box borderBottomWidth={1}>
              <Box borderBottomWidth={1} px={4} py={2} bg="gray.100">
                <Heading size="sm">Modify project</Heading>
              </Box>
              <Box p={4}>
                <Link href={`/projects/${projectId}/edit`} passHref>
                  <Button as="a" colorScheme="blue" size="lg" w="100%">
                    Edit Project
                  </Button>
                </Link>
              </Box>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default DetailsSidebar;
