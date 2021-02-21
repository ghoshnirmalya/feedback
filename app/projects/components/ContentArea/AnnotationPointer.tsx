import { Box } from "@chakra-ui/react";
import React, { FC } from "react";

type IProps = {
  coordinateX: number | null;
  coordinateY: number | null;
  annotation: {
    x: number;
    y: number;
  };
};

const AnnotationPointer: FC<IProps> = ({
  coordinateX,
  coordinateY,
  annotation,
}) => {
  if (!coordinateX || !coordinateY) {
    return null;
  }

  return (
    <Box
      pos="absolute"
      top={`calc(${annotation.y}% - 10px)`}
      left={`calc(${annotation.x}% - 10px)`}
      w={4}
      h={4}
      bgColor="yellow.100"
      borderRadius="50%"
      borderWidth={2}
      borderColor="yellow.900"
    />
  );
};

export default AnnotationPointer;
