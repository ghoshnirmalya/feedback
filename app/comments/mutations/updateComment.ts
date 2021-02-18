import { Ctx } from "blitz";
import db, { Prisma, User, File } from "db";

type UpdateCommentInput = Pick<Prisma.CommentUpdateArgs, "where" | "data">;

export default async function updateComment(
  { where, data }: UpdateCommentInput,
  ctx: Ctx
) {
  ctx.session.$authorize();

  const comment = await db.comment.update({
    where,
    data: {
      ...data,
      file: ({
        connect: { id: (data.file as File).id },
      } as unknown) as undefined,
      user: ({
        connect: { id: (data.user as User).id },
      } as unknown) as undefined,
    },
  });

  return comment;
}
