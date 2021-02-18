import { Ctx } from "blitz";
import db, { Prisma } from "db";

type DeleteFileInput = Pick<Prisma.FileDeleteArgs, "where">;

export default async function deleteFile({ where }: DeleteFileInput, ctx: Ctx) {
  ctx.session.$authorize();

  const file = await db.file.delete({ where });

  return file;
}
