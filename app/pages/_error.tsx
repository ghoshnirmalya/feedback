import { Button, Center } from "@chakra-ui/react";
import ErrorState from "app/components/ErrorState";
import PublicLayout from "app/layouts/PublicLayout";
import { BlitzPage, Link } from "blitz";
import React from "react";

interface IProps {
  statusCode: number;
}

const ErrorPage: BlitzPage<IProps> = ({ statusCode }) => {
  return (
    <Center h="100vh" w="100%">
      <ErrorState
        heading="Error"
        text={
          statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"
        }
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

export async function getServerSideProps({ res, err }) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {
    props: { statusCode },
  };
}

ErrorPage.getLayout = (page) => (
  <PublicLayout title="Error">{page}</PublicLayout>
);

export default ErrorPage;
