import {
  Box,
  Center,
  Flex,
  HStack,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import UserDetails from "app/layouts/ProtectedLayout/TopNavbar/UserDetails";
import { Link } from "blitz";
import React, { FC, Suspense } from "react";
import { MdBugReport } from "react-icons/md";

const links = [
  {
    href: "/teams",
    label: "Teams",
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
      shadow="sm"
    >
      <Flex justifyContent="space-between" w="100%">
        <HStack spacing={4} align="center">
          {linksNode()}
        </HStack>
        <HStack spacing={4} align="center">
          <IconButton
            size="sm"
            aria-label="Report an issue"
            rel="noopener"
            icon={<MdBugReport size={24} />}
            as="a"
            href="https://github.com/ghoshnirmalya/feedback/issues/new"
            target="_blank"
          />
          <Suspense
            fallback={
              <Center h="100vh">
                <Spinner />
              </Center>
            }
          >
            <UserDetails />
          </Suspense>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default TopNavbar;
