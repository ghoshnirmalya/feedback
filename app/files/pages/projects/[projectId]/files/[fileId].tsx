import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getFile from "app/files/queries/getFile"
import deleteFile from "app/files/mutations/deleteFile"

export const File = () => {
  const router = useRouter()
  const fileId = useParam("fileId", "number")
  const projectId = useParam("projectId", "number")
  const [file] = useQuery(getFile, { where: { id: fileId } })
  const [deleteFileMutation] = useMutation(deleteFile)

  return (
    <div>
      <h1>File {file.id}</h1>
      <pre>{JSON.stringify(file, null, 2)}</pre>

      <Link href={`/projects/${projectId}/files/${file.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteFileMutation({ where: { id: file.id } })
            router.push(`/projects/${projectId}/files`)
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowFilePage: BlitzPage = () => {
  const projectId = useParam("projectId", "number")

  return (
    <div>
      <p>
        <Link href={`/projects/${projectId}/files`}>
          <a>Files</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <File />
      </Suspense>
    </div>
  )
}

ShowFilePage.getLayout = (page) => <Layout title={"File"}>{page}</Layout>

export default ShowFilePage
