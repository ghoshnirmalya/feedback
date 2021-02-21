import { Button, Center } from "@chakra-ui/react";
import EmptyState from "app/components/EmptyState";
import PublicLayout from "app/layouts/PublicLayout";
import { BlitzPage, Link } from "blitz";
import React from "react";

const AuthPage: BlitzPage = () => {
  return (
    <Center h="100vh" w="100%">
      <EmptyState
        icon="/illustrations/Online protection_Monochromatic.svg"
        heading="Welcome"
        text="Please sign in to use this website."
        buttons={[
          <Link href="/api/auth/google/callback" passHref key="authButton">
            <Button colorScheme="yellow" type="submit" size="lg">
              Continue with your Google account
            </Button>
          </Link>,
        ]}
      />
    </Center>
  );
};

AuthPage.getLayout = (page) => (
  <PublicLayout title="Sign Up">{page}</PublicLayout>
);

export default AuthPage;
