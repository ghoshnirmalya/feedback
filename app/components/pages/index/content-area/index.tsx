import { Box, useColorModeValue } from "@chakra-ui/react"
import React, { FC } from "react"

const ContentArea: FC = () => {
  const bgColor = useColorModeValue("brand.100", "brand.900")

  return (
    <Box h="calc(100vh - 50px)" w="calc(100vw - 500px)" bg={bgColor} p={14} overflow="hidden">
      <Box shadow="xl" bg={bgColor} h="calc(100vh - 50px - 120px)" overflowY="auto" mx="auto">
        Hello
      </Box>
    </Box>
  )
}

export default ContentArea
