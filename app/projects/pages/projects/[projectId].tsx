import { Flex, Text } from "@chakra-ui/react"
import Layout from "app/layouts/Layout"
import deleteProject from "app/projects/mutations/deleteProject"
import getProject from "app/projects/queries/getProject"
import { BlitzPage, dynamic, Link, useMutation, useParam, useQuery, useRouter } from "blitz"
import React, { Suspense } from "react"

const LazyContentArea = dynamic(
  () => import(/* webpackChunkName: 'lazyContentArea' */ "app/projects/components/ContentArea"),
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
  () => import(/* webpackChunkName: 'lazyRightSidebar' */ "app/projects/components/RightSidebar"),
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

export const Project = () => {
  const router = useRouter()
  const projectId = useParam("projectId", "number")
  const [project] = useQuery(getProject, { where: { id: projectId } })
  const [deleteProjectMutation] = useMutation(deleteProject)

  return (
    <div>
      <h1>Project {project.id}</h1>
      <pre>{JSON.stringify(project, null, 2)}</pre>

      <Link href={`/projects/${project.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteProjectMutation({ where: { id: project.id } })
            router.push("/projects")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowProjectPage: BlitzPage = () => {
  return (
    <Flex flexDir="column">
      <div>
        <p>
          <Link href="/projects">
            <a>Projects</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Project />
        </Suspense>
      </div>
      <Flex>
        <LazyContentArea />
        <LazyRightSidebar />
      </Flex>
    </Flex>
  )
}

ShowProjectPage.getLayout = (page) => <Layout title={"Project"}>{page}</Layout>

export default ShowProjectPage
