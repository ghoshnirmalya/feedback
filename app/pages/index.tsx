import {
  Center,
  Container,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import Layout from "app/layouts/Layout";
import { BlitzPage } from "blitz";
import React from "react";

const Home: BlitzPage = () => {
  return (
    <Container maxW="4xl" py={24} minH="calc(100vh - 80px)">
      <Center h="100%">
        <VStack spacing={16}>
          <VStack spacing={8} alignItems="flex-start">
            <Heading
              as="h1"
              bgGradient="linear(to-l, #7928CA,#FF0080)"
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold"
            >
              Feedback
            </Heading>
            <Heading as="h2" fontSize="6xl" fontWeight="bold">
              Collect feedback for your designs.
            </Heading>
            <Text fontSize="2xl">
              Feedback is an{" "}
              <Link
                href="https://github.com/ghoshnirmalya/writy"
                target="_blank"
                color="blue.500"
                rel="noopener"
              >
                Open Source
              </Link>{" "}
              application powered by Next.js, Blitz.js and Chakra UI.
            </Text>
          </VStack>
        </VStack>
      </Center>
    </Container>
  );
};

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export default Home;
