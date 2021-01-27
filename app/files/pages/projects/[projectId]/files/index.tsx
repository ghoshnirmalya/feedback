import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, useParam, BlitzPage } from "blitz"
import getFiles from "app/files/queries/getFiles"

const ITEMS_PER_PAGE = 100

export const FilesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const projectId = useParam("projectId", "number")
  const [{ files, hasMore }] = usePaginatedQuery(getFiles, {
    where: { project: { id: projectId } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <Link href={`/projects/${projectId}/files/${file.id}`}>
              <a>{file.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const FilesPage: BlitzPage = () => {
  const projectId = useParam("projectId", "number")

  return (
    <div>
      <p>
        <Link href={`/projects/${projectId}/files/new`}>
          <a>Create File</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <FilesList />
      </Suspense>
    </div>
  )
}

FilesPage.getLayout = (page) => <Layout title={"Files"}>{page}</Layout>

export default FilesPage
