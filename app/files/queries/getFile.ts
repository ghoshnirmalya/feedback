import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetFileInput = Pick<Prisma.FindFirstFileArgs, "where">

export default async function getFile({ where }: GetFileInput, ctx: Ctx) {
  ctx.session.authorize()

  const file = await db.file.findFirst({ where })

  if (!file) throw new NotFoundError()

  return file
}
