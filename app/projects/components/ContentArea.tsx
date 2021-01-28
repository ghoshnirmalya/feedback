import { Box } from "@chakra-ui/react";
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
    <Box h="calc(100vh - 140px)" overflow="hidden">
      <Box shadow="xl" overflowY="auto" mx="auto">
        <Box pos="relative">
          <img src="/images/demo.png" width="100%" alt="presentation" />
          <Box pos="absolute" inset="0" id="js-image" onClick={handleClick}>
            <Box
              pos="absolute"
              top={`${annotation.y - 1.5}%`}
              left={`${annotation.x - 1}%`}
              w={4}
              h={4}
              bgColor="blue.100"
              borderRadius="lg"
              borderWidth={2}
              borderColor="blue.900"
              shadow="md"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContentArea;
