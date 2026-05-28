// Creating records
// Creating a single record
const user = await prisma.user.create({
  data: {
    email: "elsa@prisma.io",
    name: "Elsa Prisma",
  },
});

// Creating multiple records.
const createMany = await prisma.user.createMany({
  data: [
    { name: "Bob", email: "bob@prisma.io" },
    { name: "Yewande", email: "yewande@prisma.io" },
  ],
  skipDuplicates: true, // Skip records with duplicate unique fields
}); // Returns: { count: 2 }

// Create and return multiple records
const users = await prisma.user.createManyAndReturn({
  data: [
    { name: "Alice", email: "alice@prisma.io" },
    { name: "Bob", email: "bob@prisma.io" },
  ],
});

// Read records
// Get Record by ID or unique field
// By unique field
const user = await prisma.user.findUnique({
  where: { email: "elsa@prisma.io" },
});

// By ID
const user = await prisma.user.findUnique({
  where: { id: 99 },
});

// Get all records.
const users = await prisma.user.findMany();

// Get first matching record
const user = await prisma.user.findFirst({
  where: { posts: { some: { likes: { gt: 100 } } } },
  orderBy: { id: "desc" },
});

// Filter records
// Single field filter
const users = await prisma.user.findMany({
  where: { email: { endsWith: "prisma.io" } },
});

// Multiple conditions with OR/AND
const users = await prisma.user.findMany({
  where: {
    OR: [{ name: { startsWith: "E" } }, { AND: { profileViews: { gt: 0 }, role: "ADMIN" } }],
  },
});

// Filter by related records
const users = await prisma.user.findMany({
  where: {
    email: { endsWith: "prisma.io" },
    posts: { some: { published: false } },
  },
});

// Select fields
const user = await prisma.user.findUnique({
  where: { email: "emma@prisma.io" },
  select: { email: true, name: true },
}); // Returns: { email: 'emma@prisma.io', name: "Emma" }

// Inlcude related records.
const users = await prisma.user.findMany({
  where: { role: "ADMIN" },
  include: { posts: true },
});

// Update
// Update a single record
const updateUser = await prisma.user.update({
  where: { email: "viola@prisma.io" },
  data: { name: "Viola the Magnificent" },
});

// Updating multiple records
const updateUsers = await prisma.user.updateMany({
  where: { email: { contains: "prisma.io" } },
  data: { role: "ADMIN" },
}); // Returns: { count: 19 }

// Update and return multiple records
const users = await prisma.user.updateManyAndReturn({
  where: { email: { contains: "prisma.io" } },
  data: { role: "ADMIN" },
}); // returns an array of objects.

// Upsert (update or create)
const upsertUser = await prisma.user.upsert({
  where: { email: "viola@prisma.io" },
  update: { name: "Viola the Magnificent" },
  create: { email: "viola@prisma.io", name: "Viola the Magnificent" },
});

// Atomic number operations
await prisma.post.updateMany({
  data: {
    views: { increment: 1 },
    likes: { increment: 1 },
  },
});

// Delete a single record
const deleteUser = await prisma.user.delete({
  where: {
    email: "bert@prisma.io",
  },
});

const deleteUsers = await prisma.user.deleteMany({
  where: {
    email: {
      contains: "prisma.io",
    },
  },
});

// Deleteing with cascades
const deletePosts = prisma.post.deleteMany({
  where: {
    authorId: 7,
  },
});

const deleteUser = prisma.user.delete({
  where: {
    id: 7,
  },
});

const transaction = await prisma.$transaction([deletePosts, deleteUser]);

// Delete all records from all tables 
const deletePosts = prisma.post.deleteMany();
const deleteProfile = prisma.profile.deleteMany();
const deleteUsers = prisma.user.deleteMany();

// The transaction runs synchronously so deleteUsers must run last.
await prisma.$transaction([deleteProfile, deletePosts, deleteUsers]);

const tablenames = await prisma.$queryRaw<
  Array<{ tablename: string }>
>`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

const tables = tablenames
  .map(({ tablename }) => tablename)
  .filter((name) => name !== "_prisma_migrations")
  .map((name) => `"public"."${name}"`)
  .join(", ");

try {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
} catch (error) {
  console.log({ error });
}