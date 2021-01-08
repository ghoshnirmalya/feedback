import { Flex } from "@chakra-ui/react"
import TopNavbar from "app/components/Layouts/TopNavbar"
import React, { FC } from "react"

const Layout: FC = ({ children }) => {
  return (
    <>
      <TopNavbar />
      <Flex h="calc(100vh - 50px)" w="100vw" justifyContent="center" alignItems="center">
        {children}
      </Flex>
    </>
  )
}

export default Layout
