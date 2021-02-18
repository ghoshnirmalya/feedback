import { Ctx } from "blitz";
import db, { Prisma, Team } from "db";

type UpdateProjectInput = Pick<Prisma.ProjectUpdateArgs, "where" | "data">;

export default async function updateProject(
  { where, data }: UpdateProjectInput,
  ctx: Ctx
) {
  ctx.session.$authorize();

  const { team, ...rest } = data;

  const project = await db.project.update({
    where,
    data: {
      ...rest,
      team: ({
        connect: { id: (data.team as Team).id },
      } as unknown) as undefined,
    },
  });

  return project;
}
