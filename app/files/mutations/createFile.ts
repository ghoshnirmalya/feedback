import { Ctx } from "blitz";
import db, { Prisma } from "db";

type CreateFileInput = {
  data: Omit<Prisma.FileCreateArgs["data"], "project">;
  projectId: string;
};
export default async function createFile(
  { data, projectId }: CreateFileInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const file = await db.file.create({
    data: { ...data, project: { connect: { id: projectId } } },
  });

  return file;
}
