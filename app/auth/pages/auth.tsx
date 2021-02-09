import AuthenticationForm from "app/auth/components/AuthenticationForm";
import PublicLayout from "app/layouts/PublicLayout";
import { BlitzPage } from "blitz";
import React from "react";

const AuthPage: BlitzPage = () => {
  return <AuthenticationForm />;
};

AuthPage.getLayout = (page) => (
  <PublicLayout title="Sign Up">{page}</PublicLayout>
);

export default AuthPage;
