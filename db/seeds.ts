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

  for (let i = 0; i < 2; i++) {
    const team = await db.team.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        users: { connect: { id: (user as User).id } },
      },
    });

    for (let i = 0; i < 3; i++) {
      const project = await db.project.create({
        data: {
          name: faker.commerce.productName(),
          isPublic: faker.random.boolean(),
          team: { connect: { id: (team as Team).id } },
        },
      });

      for (let i = 0; i < 4; i++) {
        const file = await db.file.create({
          data: {
            name: faker.commerce.productMaterial(),
            url: faker.image.imageUrl(),
            thumbnailUrl: faker.image.imageUrl(),
            height: 480,
            width: 640,
            project: { connect: { id: project.id } },
          },
        });

        for (let i = 0; i < 5; i++) {
          const comment = await db.comment.create({
            data: {
              body: faker.lorem.lines(),
              isResolved: faker.random.boolean(),
              coordinateX: faker.random.float({
                min: 10,
                max: 50,
              }),
              coordinateY: faker.random.float({
                min: 10,
                max: 50,
              }),
              file: { connect: { id: file.id } },
              user: { connect: { id: user.id } },
            },
          });

          for (let i = 0; i < 6; i++) {
            await db.reply.create({
              data: {
                body: faker.lorem.lines(),
                isResolved: faker.random.boolean(),
                comment: { connect: { id: comment.id } },
                user: { connect: { id: user.id } },
              },
            });
          }
        }
      }
    }
  }
};

export default seed;
