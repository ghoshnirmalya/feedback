import { Box, Center } from "@chakra-ui/react";
import React, { FC, MouseEvent, useState } from "react";

const ContentArea: FC = () => {
  const [annotation, setAnnotation] = useState({ x: 0, y: 0 });

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    // Calcualate co-ordinates in percentages in order to support responsive mode
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.x;
    const offsetY = e.clientY - rect.y;

    setAnnotation({
      x: (offsetX / rect.width) * 100,
      y: (offsetY / rect.height) * 100,
    });

    // Open the comment box to let the user add comments
  };

  return (
    <Center h="calc(100vh - 80px)" overflow="hidden" p={8}>
      <Box shadow="xl" overflowY="auto" mx="auto" rounded="md">
        <Box
          pos="relative"
          _hover={{
            cursor: "pointer",
          }}
        >
          <img src="/images/demo.png" width="100%" alt="presentation" />
          <Box pos="absolute" inset="0" id="js-image" onClick={handleClick}>
            <Box
              pos="absolute"
              top={`${annotation.y - 2.5}%`}
              left={`${annotation.x - 1.5}%`}
              w={8}
              h={8}
              bgColor="blue.100"
              borderRadius="50%"
              borderWidth={2}
              borderColor="blue.900"
            />
          </Box>
        </Box>
      </Box>
    </Center>
  );
};

export default ContentArea;
