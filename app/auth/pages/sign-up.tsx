import { Center, Container } from "@chakra-ui/react";
import { SignUpForm } from "app/auth/components/SignUpForm";
import PublicLayout from "app/layouts/PublicLayout";
import { BlitzPage, useRouter } from "blitz";
import React from "react";

const SignupPage: BlitzPage = () => {
  const router = useRouter();

  return (
    <Container maxW="4xl" py={24} minH="100vh">
      <Center h="100%">
        <SignUpForm onSuccess={() => router.push("/projects")} />
      </Center>
    </Container>
  );
};

SignupPage.getLayout = (page) => (
  <PublicLayout title="Sign Up">{page}</PublicLayout>
);

export default SignupPage;
