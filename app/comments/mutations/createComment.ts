import { Ctx } from "blitz";
import db, { Prisma } from "db";

type CreateCommentInput = {
  data: Omit<Prisma.CommentCreateArgs["data"], "file">;
  fileId: number;
  userId: number;
};

export default async function createComment(
  { data, fileId, userId }: CreateCommentInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const comment = await db.comment.create({
    data: {
      ...data,
      file: { connect: { id: fileId } },
      user: { connect: { id: userId } },
    },
  });

  return comment;
}
