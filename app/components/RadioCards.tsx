import { Box, Heading, Text, useRadio, VStack } from "@chakra-ui/react";
import React, { FC } from "react";

type IProps = {
  value: any;
  radio: any;
};

const RadioCards: FC<IProps> = ({ value, radio, children }) => {
  const { getInputProps, getCheckboxProps } = useRadio(radio);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" key={value.value}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth={1}
        borderRadius="md"
        _checked={{
          bg: "gray.100",
          color: "blue.500",
          borderColor: "blue.500",
        }}
        p={4}
        h="100%"
      >
        {children}
      </Box>
    </Box>
  );
};

export default RadioCards;
