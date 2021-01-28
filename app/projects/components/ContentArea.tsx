import { Box, Center, Image, Spinner, Text } from "@chakra-ui/react";
import { getFileData } from "app/selectors/file";
import { setCoordinates } from "app/slices/file";
import React, { FC, MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ContentArea: FC = () => {
  const [annotation, setAnnotation] = useState({ x: 0, y: 0 });
  const { url, name } = useSelector(getFileData());
  const dispatch = useDispatch();

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    // Calcualate co-ordinates in percentages in order to support responsive mode
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.x;
    const offsetY = e.clientY - rect.y;

    const x = (offsetX / rect.width) * 100;
    const y = (offsetY / rect.height) * 100;

    setAnnotation({
      x,
      y,
    });

    // Open the comment box to let the user add comments
    dispatch(setCoordinates({ coordinateX: x, coordinateY: y }));
  };

  const imageNode = () => {
    if (!url) {
      return (
        <Text h="100%" fontWeight="bold">
          Select an image from left
        </Text>
      );
    }

    return (
      <Box shadow="xl" overflowY="auto" mx="auto" rounded="md" w="100%">
        <Box
          pos="relative"
          _hover={{
            cursor: "pointer",
          }}
        >
          <Image
            src={url}
            alt={name}
            width="100%"
            fallback={
              <Center p={4} w="100%">
                <Spinner />
              </Center>
            }
          />
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
    );
  };

  return (
    <Center h="calc(100vh - 80px)" overflow="hidden" p={8}>
      <Center>{imageNode()}</Center>
    </Center>
  );
};

export default ContentArea;
