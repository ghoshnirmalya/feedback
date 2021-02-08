import {
  Button,
  Center,
  Container,
  Heading,
  Link as ChakraLink,
  Text,
  VStack,
} from "@chakra-ui/react";
import PublicLayout from "app/layouts/PublicLayout";
import { BlitzPage, Link } from "blitz";
import React from "react";

const isProduction = process.env.NODE_ENV === "production";
const callbackURL = isProduction
  ? `${process.env.VERCEL_URL}/api/auth/google/callback`
  : "http://localhost:3000/api/auth/google/callback";

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
              <ChakraLink
                href="https://github.com/ghoshnirmalya/feedback"
                target="_blank"
                color="blue.500"
                rel="noopener"
              >
                Open Source
              </ChakraLink>{" "}
              application powered by Next.js, Blitz.js and Chakra UI.
            </Text>
            <Link href={callbackURL} passHref>
              <Button colorScheme="blue" type="submit" size="lg">
                Get started using your Google account
              </Button>
            </Link>
          </VStack>
        </VStack>
      </Center>
    </Container>
  );
};

Home.getLayout = (page) => <PublicLayout title="Home">{page}</PublicLayout>;

export default Home;
