import { Ctx, NotFoundError } from "blitz";
import db, { Prisma } from "db";

type GetUserInput = Pick<Prisma.UserFindFirstArgs, "where">;

export default async function getUser({ where }: GetUserInput, ctx: Ctx) {
  ctx.session.$authorize();

  const user = await db.user.findFirst({ where });

  if (!user) throw new NotFoundError();

  return user;
}
