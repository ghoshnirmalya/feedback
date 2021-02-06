import { Ctx } from "blitz";
import db, { Prisma } from "db";

type DeleteTeamInput = Pick<Prisma.TeamDeleteArgs, "where">;

export default async function deleteTeam({ where }: DeleteTeamInput, ctx: Ctx) {
  ctx.session.authorize();

  const team = await db.team.delete({ where });

  return team;
}
