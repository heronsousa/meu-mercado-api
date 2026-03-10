import { Resource } from "sst";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: Resource.MeuMercadoDB.host,
    port: Resource.MeuMercadoDB.port,
    user: Resource.MeuMercadoDB.username,
    password: Resource.MeuMercadoDB.password,
    database: Resource.MeuMercadoDB.database,
  },
});
