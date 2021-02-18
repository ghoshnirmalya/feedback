import { Ctx } from "blitz";
import db, { Prisma } from "db";

type GetCommentsInput = Pick<
  Prisma.CommentFindManyArgs,
  "where" | "orderBy" | "skip" | "take"
>;

export default async function getComments(
  { where, orderBy, skip = 0, take }: GetCommentsInput,
  ctx: Ctx
) {
  const comments = await db.comment.findMany({
    where,
    orderBy,
    take,
    skip,
    include: {
      user: true,
    },
  });

  const count = await db.comment.count();
  const hasMore = typeof take === "number" ? skip + take < count : false;
  const nextPage = hasMore ? { take, skip: skip + take! } : null;

  return {
    comments,
    nextPage,
    hasMore,
    count,
  };
}
