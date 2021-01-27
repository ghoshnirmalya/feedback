import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetFilesInput = Pick<Prisma.FindManyFileArgs, "where" | "orderBy" | "skip" | "take">

export default async function getFiles(
  { where, orderBy, skip = 0, take }: GetFilesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const files = await db.file.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.file.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    files,
    nextPage,
    hasMore,
    count,
  }
}
