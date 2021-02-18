import { Ctx } from "blitz";
import db, { Prisma } from "db";

type CreateUserInput = Pick<Prisma.UserCreateArgs, "data">;
export default async function createUser({ data }: CreateUserInput, ctx: Ctx) {
  ctx.session.$authorize();

  const user = await db.user.create({ data });

  return user;
}
