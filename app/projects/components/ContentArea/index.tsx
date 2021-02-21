import { Center } from "@chakra-ui/react";
import ContentImage from "app/projects/components/ContentArea/ContentImage";
import React, { FC } from "react";

const ContentArea: FC = () => {
  return (
    <Center h="calc(100vh - 80px)" bg="gray.100" p={8}>
      <ContentImage />
    </Center>
  );
};

export default ContentArea;
