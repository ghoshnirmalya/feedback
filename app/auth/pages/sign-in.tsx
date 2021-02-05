import { Center, Container } from "@chakra-ui/react";
import { SignInForm } from "app/auth/components/SignInForm";
import PublicLayout from "app/layouts/PublicLayout";
import { BlitzPage, useRouter } from "blitz";
import React from "react";

const SignInPage: BlitzPage = () => {
  const router = useRouter();

  return (
    <Container maxW="4xl" py={24} minH="100vh">
      <Center h="100%">
        <SignInForm onSuccess={() => router.push("/projects")} />
      </Center>
    </Container>
  );
};

SignInPage.getLayout = (page) => (
  <PublicLayout title="Sign Up">{page}</PublicLayout>
);

export default SignInPage;
