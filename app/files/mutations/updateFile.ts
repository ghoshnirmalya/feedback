import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateFileInput = {
  where: Prisma.FileUpdateArgs["where"]
  data: Omit<Prisma.FileUpdateArgs["data"], "project">
  projectId: number
}

export default async function updateFile({ where, data }: UpdateFileInput, ctx: Ctx) {
  ctx.session.authorize()

  // Don't allow updating
  delete (data as any).project

  const file = await db.file.update({ where, data })

  return file
}
