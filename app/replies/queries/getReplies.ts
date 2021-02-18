import { Ctx } from "blitz";
import db, { Prisma } from "db";

type GetRepliesInput = Pick<
  Prisma.ReplyFindManyArgs,
  "where" | "orderBy" | "skip" | "take"
>;

export default async function getReplies(
  { where, orderBy, skip = 0, take }: GetRepliesInput,
  ctx: Ctx
) {
  const replies = await db.reply.findMany({
    where,
    orderBy,
    take,
    skip,
    include: {
      user: true,
    },
  });

  const count = await db.reply.count();
  const hasMore = typeof take === "number" ? skip + take < count : false;
  const nextPage = hasMore ? { take, skip: skip + take! } : null;

  return {
    replies,
    nextPage,
    hasMore,
    count,
  };
}
