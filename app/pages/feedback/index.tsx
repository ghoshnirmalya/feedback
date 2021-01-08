import { Flex, Text } from "@chakra-ui/react"
import { dynamic } from "blitz"
import React, { FC } from "react"

const LazyContentArea = dynamic(
  () =>
    import(/* webpackChunkName: 'lazyContentArea' */ "app/components/Pages/Feedback/ContentArea"),
  {
    ssr: false,
    loading: () => {
      return (
        <Flex
          h="calc(100vh - 50px)"
          w="calc(100vw - 300px)"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="20" fontWeight="bold">
            Loading...
          </Text>
        </Flex>
      )
    },
  }
)

const LazyRightSidebar = dynamic(
  () =>
    import(/* webpackChunkName: 'lazyRightSidebar' */ "app/components/Pages/Feedback/RightSidebar"),
  {
    ssr: false,
    loading: () => {
      return (
        <Flex h={100} alignItems="center" justifyContent="center">
          <Text fontSize="20" fontWeight="bold">
            Loading...
          </Text>
        </Flex>
      )
    },
  }
)

const FeedbackPageComponent: FC = () => {
  return (
    <Flex flexDir="column">
      <Flex>
        <LazyContentArea />
        <LazyRightSidebar />
      </Flex>
    </Flex>
  )
}

export default FeedbackPageComponent
