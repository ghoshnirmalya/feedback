import { Ctx } from "blitz";
import db, { Prisma } from "db";

type DeleteCommentInput = Pick<Prisma.CommentDeleteArgs, "where">;

export default async function deleteComment(
  { where }: DeleteCommentInput,
  ctx: Ctx
) {
  ctx.session.$authorize();

  const comment = await db.comment.delete({ where });

  return comment;
}
