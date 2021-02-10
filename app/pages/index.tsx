import {
  Button,
  Center,
  Container,
  Heading,
  Link as ChakraLink,
  Text,
  VStack,
} from "@chakra-ui/react";
import withAuthentication from "app/auth/hocs/withAuthentication";
import PublicLayout from "app/layouts/PublicLayout";
import { BlitzPage, GetServerSideProps, Link } from "blitz";
import React from "react";

const Home: BlitzPage = () => {
  return (
    <Container maxW="2xl" py={24} minH="calc(100vh - 80px)">
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
            <Link href="/api/auth/google/callback" passHref>
              <Button colorScheme="blue" type="submit" size="lg">
                Continue with your Google account
              </Button>
            </Link>
          </VStack>
        </VStack>
      </Center>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await withAuthentication.isAuth(ctx);

  return {
    props: {},
  };
};

Home.getLayout = (page) => <PublicLayout title="Home">{page}</PublicLayout>;

export default withAuthentication(Home);
