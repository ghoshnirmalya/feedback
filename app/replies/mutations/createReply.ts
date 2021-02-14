import { Ctx } from "blitz";
import db, { Comment, Prisma, User } from "db";

type CreateReplyInput = Pick<Prisma.ReplyCreateArgs, "data">;
export default async function createReply(
  { data }: CreateReplyInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const reply = await db.reply.create({
    data: {
      ...data,
      comment: { connect: { id: (data.comment as Comment).id } },
      user: { connect: { id: (data.user as User).id } },
    },
  });

  return reply;
}
