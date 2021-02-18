import { Ctx } from "blitz";
import db, { Prisma, Team } from "db";

type CreateProjectInput = Pick<Prisma.ProjectCreateArgs, "data">;
export default async function createProject(
  { data }: CreateProjectInput,
  ctx: Ctx
) {
  ctx.session.$authorize();

  const { team, ...rest } = data;

  const project = await db.project.create({
    data: {
      ...rest,
      team: ({
        connect: { id: (data.team as Team).id },
      } as unknown) as undefined,
    },
  });

  return project;
}
