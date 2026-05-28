require("dotenv").config();

module.exports = {
    schema: "prisma/schema.prisma",
    typedSql: { 
      path: "./prisma/sql" 
    },
    migrations: { 
      path: "prisma/migrations", 
    },
    datasource: { 
      url: process.env.DATABASE_URL, 
    },
};