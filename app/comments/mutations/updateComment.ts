import { Ctx } from "blitz";
import db, { Prisma } from "db";

type UpdateCommentInput = {
  where: Prisma.CommentUpdateArgs["where"];
  data: Omit<Prisma.CommentUpdateArgs["data"], "file">;
  fileId: number;
};

export default async function updateComment(
  { where, data }: UpdateCommentInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  // Don't allow updating
  delete (data as any).file;

  const comment = await db.comment.update({ where, data });

  return comment;
}
