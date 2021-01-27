import { Box, Flex, HStack, IconButton } from "@chakra-ui/react";
import { Link } from "blitz";
import React, { FC } from "react";
import { MdBugReport } from "react-icons/md";

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/projects",
    label: "Projects",
  },
];

const TopNavbar: FC = () => {
  const linksNode = () => {
    return links.map((link) => {
      return (
        <Link key={link.href} href={link.href} passHref>
          <Box as="a" fontWeight="bold">
            {link.label}
          </Box>
        </Link>
      );
    });
  };

  return (
    <Flex
      h="80px"
      borderBottomWidth={1}
      px={8}
      alignItems="center"
      pos="sticky"
      top={0}
      bg="white"
      zIndex={1}
    >
      <Flex justifyContent="space-between" w="100%">
        <HStack spacing={8} align="center">
          {linksNode()}
        </HStack>
        <HStack spacing={8} align="center">
          <IconButton
            size="sm"
            aria-label="Report an issue"
            rel="noopener"
            icon={<MdBugReport size={24} />}
            as="a"
            href="https://github.com/ghoshnirmalya/feedback/issues/new"
            target="_blank"
          />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default TopNavbar;
