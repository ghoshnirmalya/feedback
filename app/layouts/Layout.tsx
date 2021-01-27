import { ChakraProvider, extendTheme, Flex, LightMode } from "@chakra-ui/react"
import TopNavbar from "app/layouts/TopNavbar"
import { Head } from "blitz"
import { ReactNode } from "react"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  const config = {
    useSystemColorMode: false,
    initialColorMode: "light",
  }
  const customTheme = extendTheme({
    config,
  })

  return (
    <>
      <Head>
        <title>{title || "feedback"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={customTheme}>
        <LightMode>
          <TopNavbar />
          <Flex h="calc(100vh - 50px)" w="100vw" justifyContent="center" alignItems="center">
            {children}
          </Flex>
        </LightMode>
      </ChakraProvider>
    </>
  )
}

export default Layout
