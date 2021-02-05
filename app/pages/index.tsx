import {
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import PublicLayout from "app/layouts/PublicLayout";
import { BlitzPage, Link as _Link } from "blitz";
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
            <HStack spacing={4}>
              <_Link href="/sign-up">
                <Button colorScheme="blue" type="submit" size="lg">
                  Get started
                </Button>
              </_Link>
              <_Link href="/sign-in">
                <Button
                  colorScheme="blue"
                  type="submit"
                  size="lg"
                  variant="outline"
                >
                  Already have an account?
                </Button>
              </_Link>
            </HStack>
          </VStack>
        </VStack>
      </Center>
    </Container>
  );
};

Home.getLayout = (page) => <PublicLayout title="Home">{page}</PublicLayout>;

export default Home;
