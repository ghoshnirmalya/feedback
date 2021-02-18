import { Ctx } from "blitz";
import db, { Prisma } from "db";

type UpdateReplyInput = Pick<Prisma.ReplyUpdateArgs, "where" | "data">;

export default async function updateReply(
  { where, data }: UpdateReplyInput,
  ctx: Ctx
) {
  ctx.session.$authorize();

  const reply = await db.reply.update({ where, data });

  return reply;
}
