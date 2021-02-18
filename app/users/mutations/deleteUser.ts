import { Ctx } from "blitz";
import db, { Prisma } from "db";

type DeleteUserInput = Pick<Prisma.UserDeleteArgs, "where">;

export default async function deleteUser({ where }: DeleteUserInput, ctx: Ctx) {
  ctx.session.$authorize();

  const user = await db.user.delete({ where });

  return user;
}
