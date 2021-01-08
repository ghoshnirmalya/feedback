import { Box, useColorModeValue } from "@chakra-ui/react"
import React, { FC } from "react"

const RightSidebar: FC = () => {
  const bgColor = useColorModeValue("brand.100", "brand.900")

  return (
    <Box w="500px" bg={bgColor} borderLeftWidth={1} overflowY="hidden">
      Sidebar
    </Box>
  )
}

export default RightSidebar
