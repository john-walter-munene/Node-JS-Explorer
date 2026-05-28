const { test } = require("@prisma/client/sql");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const newUser = await prisma.$queryRawTyped(test());

    console.log(newUser);
}

main();

// Passing Arguments to TypedSQL Queries
// const { getUsersByAge } = require("@prisma/client/sql");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// const minAge = 18;
// const maxAge = 30;
// const users = await prisma.$queryRawTyped(getUsersByAge(minAge, maxAge));
// console.log(users);

// To have a native feel of raw SQL do

async function nativeSQLInPrismaFirstEnv() {
    const users = await prisma.$queryRaw`
        SELECT *
        FROM "User"
        WHERE role = 'USER'
        ORDER BY id DESC
    `;

  console.log(users);

    // Dynamic params
    const minAge = 18;
    const users = await prisma.$queryRaw` SELECT * FROM users WHERE age > ${minAge}`;
}

nativeSQLInPrismaFirstEnv();