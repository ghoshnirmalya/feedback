import { Ctx, NotFoundError } from "blitz";
import db, { Prisma } from "db";

type GetTeamInput = Pick<Prisma.TeamFindFirstArgs, "where">;

export default async function getTeam({ where }: GetTeamInput, ctx: Ctx) {
  ctx.session.$authorize();

  const team = await db.team.findFirst({
    where,
    include: {
      users: true,
      projects: true,
    },
  });

  if (!team) throw new NotFoundError();

  return team;
}
