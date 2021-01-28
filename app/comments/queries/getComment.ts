import { Ctx, NotFoundError } from "blitz";
import db, { Prisma } from "db";

type GetCommentInput = Pick<Prisma.FindFirstCommentArgs, "where">;

export default async function getComment({ where }: GetCommentInput, ctx: Ctx) {
  ctx.session.authorize();

  const comment = await db.comment.findFirst({ where });

  if (!comment) throw new NotFoundError();

  return comment;
}
