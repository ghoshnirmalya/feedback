import AuthenticationForm from "app/auth/components/AuthenticationForm";
import PublicLayout from "app/layouts/PublicLayout";
import { BlitzPage } from "blitz";
import React from "react";

const isProduction = process.env.NODE_ENV === "production";
const callbackURL = isProduction
  ? `${process.env.VERCEL_URL}/api/auth/google/callback`
  : "http://localhost:3000/api/auth/google/callback";

const AuthPage: BlitzPage = () => {
  return <AuthenticationForm />;
};

AuthPage.getLayout = (page) => (
  <PublicLayout title="Sign Up">{page}</PublicLayout>
);

export default AuthPage;
