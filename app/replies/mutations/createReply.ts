import { Ctx } from "blitz";
import db, { Prisma } from "db";

type CreateReplyInput = Pick<Prisma.ReplyCreateArgs, "data">;
export default async function createReply(
  { data }: CreateReplyInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const reply = await db.reply.create({ data });

  return reply;
}
