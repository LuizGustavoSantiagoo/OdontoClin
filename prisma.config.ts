import "dotenv/config";
import { defineConfig} from "@prisma/config";

const databaseUrl = process.env.DATABASE_URL
if(!databaseUrl) {
  throw new Error('DATABASE_URL IS REQUIRED')
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: databaseUrl,
  },
});
