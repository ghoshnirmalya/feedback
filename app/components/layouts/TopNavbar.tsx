import { Flex, HStack, IconButton, Link } from "@chakra-ui/react"
import React, { FC } from "react"
import { MdBugReport } from "react-icons/md"

const TopNavbar: FC = () => {
  return (
    <Flex h="50px" borderBottomWidth={1} px={4} alignItems="center">
      <Flex justifyContent="space-between" w="100%">
        <HStack spacing={4} align="center">
          <Link href="/" fontWeight="bold">
            Writy
          </Link>
        </HStack>
        <HStack spacing={4} align="center">
          <IconButton
            size="sm"
            aria-label="Report an issue"
            rel="noopener"
            icon={<MdBugReport size={24} />}
            as="a"
            href="https://github.com/ghoshnirmalya/writy/issues/new"
            target="_blank"
          />
        </HStack>
      </Flex>
    </Flex>
  )
}

export default TopNavbar
