import { Ctx } from "blitz";
import db, { Prisma } from "db";

type DeleteReplyInput = Pick<Prisma.ReplyDeleteArgs, "where">;

export default async function deleteReply(
  { where }: DeleteReplyInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const reply = await db.reply.delete({ where });

  return reply;
}
