import { Box } from "@chakra-ui/react";
import { useParam, useRouter } from "blitz";
import React, { FC } from "react";

const RightSidebar: FC = () => {
  const router = useRouter();
  const projectId = useParam("projectId", "number");
  const page = Number(router.query.page) || 0;

  return (
    <Box h="calc(100vh - 140px)" overflowY="scroll">
      All comments will show up here.
    </Box>
  );
};

export default RightSidebar;
