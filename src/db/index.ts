// import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { envs } from "../config/env";

// const client = new Client({
//   connectionString: "postgres://user:password@host:port/db",
// });

// or
const client = new Client({
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  user: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_DATABASE,
});

(async () => await client.connect())();
const db = drizzle(client);

export { db, client };