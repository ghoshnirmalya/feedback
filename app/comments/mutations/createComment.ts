import { Ctx } from "blitz";
import db, { Prisma, User, File } from "db";

type CreateCommentInput = Pick<Prisma.CommentCreateArgs, "data">;
export default async function createComment(
  { data }: CreateCommentInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const comment = await db.comment.create({
    data: {
      ...data,
      file: { connect: { id: (data.file as File).id } },
      user: { connect: { id: (data.user as User).id } },
    },
  });

  return comment;
}
