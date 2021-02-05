import { Container, Spinner, VStack } from "@chakra-ui/react";
import ProtectedLayout from "app/layouts/ProtectedLayout";
import EditTeamForm from "app/teams/components/EditTeamForm";
import EditTeamHeading from "app/teams/components/EditTeamHeading";
import { BlitzPage } from "blitz";
import React, { Suspense } from "react";

const EditTeamPage: BlitzPage = () => {
  return (
    <Container maxW="6xl" p={8}>
      <Suspense fallback={<Spinner />}>
        <VStack spacing={8} w="100%" align="left">
          <EditTeamHeading />
          <EditTeamForm />
        </VStack>
      </Suspense>
    </Container>
  );
};

EditTeamPage.getLayout = (page) => (
  <ProtectedLayout title={"Edit Team"}>{page}</ProtectedLayout>
);

export default EditTeamPage;
