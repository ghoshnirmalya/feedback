import { Ctx } from "blitz";
import db, { Prisma } from "db";

type GetTeamsInput = Pick<
  Prisma.FindManyTeamArgs,
  "where" | "orderBy" | "skip" | "take"
>;

export default async function getTeams(
  { where, orderBy, skip = 0, take }: GetTeamsInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const teams = await db.team.findMany({
    where,
    orderBy,
    take,
    skip,
    include: {
      users: true,
    },
  });

  const count = await db.team.count();
  const hasMore = typeof take === "number" ? skip + take < count : false;
  const nextPage = hasMore ? { take, skip: skip + take! } : null;

  return {
    teams,
    nextPage,
    hasMore,
    count,
  };
}
