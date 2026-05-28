const prisma = require("./lib/prisma");

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "johnwaltermunene@gmail.com",
      name: "John Walter",
      posts: {
        create: [
          {
            title: "My first day at Prisma",
            categories: { create: { name: "Office" } },
          },
          {
            title: "How to connect to a SQLite database",
            categories: { create: [{ name: "Databases" }, { name: "Tutorials" }] },
          },
        ],
      },
    },
  });

  console.log(user);

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  console.log(
    "All users:",
    JSON.stringify(allUsers, null, 2)
  );
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });