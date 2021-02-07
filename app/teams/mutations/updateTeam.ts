import { Ctx } from "blitz";
import db, { Prisma, User } from "db";

type UpdateTeamInput = Pick<Prisma.TeamUpdateArgs, "where" | "data">;

export default async function updateTeam(
  { where, data }: UpdateTeamInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const { users, ...rest } = data;

  const team = await db.team.update({
    where,
    data: {
      ...rest,
      users: { connect: { id: (data.users as User).id } },
    },
  });

  return team;
}
