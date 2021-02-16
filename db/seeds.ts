import db, { Team, User } from "db";
import faker from "faker";

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */

const seed = async () => {
  const user = (await (db.user.findFirst({
    where: {
      email: "nirmalya.email@gmail.com",
    },
  }) as unknown)) as User;

  for (let i = 0; i < 5; i++) {
    const team = await db.team.create({
      data: {
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        users: { connect: { id: (user as User).id } },
      },
    });

    const project = await db.project.create({
      data: {
        name: faker.lorem.lines(),
        team: { connect: { id: (team as Team).id } },
      },
    });

    const file = await db.file.create({
      data: {
        name: faker.lorem.lines(),
        url: faker.image.imageUrl(),
        thumbnailUrl: faker.image.imageUrl(),
        height: 480,
        width: 640,
        project: { connect: { id: project.id } },
      },
    });

    const comment = await db.comment.create({
      data: {
        body: faker.lorem.lines(),
        coordinateX: 40,
        coordinateY: 50,
        file: { connect: { id: file.id } },
        user: { connect: { id: user.id } },
      },
    });

    await db.reply.create({
      data: {
        body: faker.lorem.lines(),
        comment: { connect: { id: comment.id } },
        user: { connect: { id: user.id } },
      },
    });
  }
};

export default seed;
