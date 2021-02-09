import { Box, Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type ContainerProps = {
  title?: string;
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <Box minH="100vh">
      <Flex>{children}</Flex>
    </Box>
  );
};

export default Container;
