import { Button, Center } from "@chakra-ui/react";
import ErrorState from "app/components/ErrorState";
import PublicLayout from "app/layouts/PublicLayout";
import { BlitzPage, Link } from "blitz";
import React from "react";

// ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------
const Page404: BlitzPage = () => {
  return (
    <Center h="100vh" w="100%">
      <ErrorState
        heading="Error 404"
        text="This page could not be found"
        icon="/illustrations/Online protection_Monochromatic.svg"
        buttons={[
          <Link href="/" passHref>
            <Button colorScheme="blue" type="submit" size="lg">
              Go to the home page
            </Button>
          </Link>,
        ]}
      />
    </Center>
  );
};

Page404.getLayout = (page) => <PublicLayout title="404">{page}</PublicLayout>;

export default Page404;
