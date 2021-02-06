import { Ctx } from "blitz";
import db, { Prisma } from "db";

type UpdateTeamInput = Pick<Prisma.TeamUpdateArgs, "where" | "data">;

export default async function updateTeam(
  { where, data }: UpdateTeamInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const team = await db.team.update({ where, data });

  return team;
}
