import {
  ChakraProvider,
  ColorModeOptions,
  extendTheme,
  LightMode,
  Spinner,
} from "@chakra-ui/react";
import Container from "app/layouts/AnonymousLayout/Container";
import { Head } from "blitz";
import React, { ReactNode, Suspense } from "react";

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

const PublicLayout = ({ title, children }: LayoutProps) => {
  const config: ColorModeOptions = {
    useSystemColorMode: false,
    initialColorMode: "light",
  };
  const customTheme = extendTheme({
    config,
  });

  return (
    <>
      <Head>
        <title>{title || "feedback"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={customTheme}>
        <LightMode>
          <Suspense fallback={<Spinner />}>
            <Container>{children}</Container>
          </Suspense>
        </LightMode>
      </ChakraProvider>
    </>
  );
};

export default PublicLayout;
