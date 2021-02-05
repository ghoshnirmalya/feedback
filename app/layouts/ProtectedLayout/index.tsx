import {
  Box,
  ChakraProvider,
  extendTheme,
  Flex,
  LightMode,
} from "@chakra-ui/react";
import TopNavbar from "app/layouts/ProtectedLayout/TopNavbar";
import { Head } from "blitz";
import React, { ReactNode } from "react";

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  const config = {
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
          <Box minH="100vh">
            <TopNavbar />
            <Flex>{children}</Flex>
          </Box>
        </LightMode>
      </ChakraProvider>
    </>
  );
};

export default Layout;
