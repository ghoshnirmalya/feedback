import { Ctx } from "blitz";
import db, { Prisma, User } from "db";

type CreateTeamInput = Pick<Prisma.TeamCreateArgs, "data">;
export default async function createTeam({ data }: CreateTeamInput, ctx: Ctx) {
  ctx.session.$authorize();

  const { users, ...rest } = data;

  const team = await db.team.create({
    data: {
      ...rest,
      users: { connect: { id: (data.users as User).id } },
    },
  });

  return team;
}
