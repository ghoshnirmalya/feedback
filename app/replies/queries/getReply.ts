import { Ctx, NotFoundError } from "blitz";
import db, { Prisma } from "db";

type GetReplyInput = Pick<Prisma.FindFirstReplyArgs, "where">;

export default async function getReply({ where }: GetReplyInput, ctx: Ctx) {
  ctx.session.authorize();

  const reply = await db.reply.findFirst({ where });

  if (!reply) throw new NotFoundError();

  return reply;
}
