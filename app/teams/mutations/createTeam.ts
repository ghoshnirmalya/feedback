import { Ctx } from "blitz";
import db, { Prisma } from "db";

type CreateTeamInput = Pick<Prisma.TeamCreateArgs, "data">;
export default async function createTeam({ data }: CreateTeamInput, ctx: Ctx) {
  ctx.session.authorize();

  const team = await db.team.create({ data });

  return team;
}
