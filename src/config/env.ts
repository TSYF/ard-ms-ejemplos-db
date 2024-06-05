import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT:                       get("PORT").default(8000).asPortNumber(),
    DB_HOST:                    get("DB_HOST").default("localhost").asString(),
    DB_PORT:                    get("DB_PORT").default(5432).asPortNumber(),
    DB_USER:                    get("DB_USER").default("postgres").asString(),
    DB_PASSWORD:                get("DB_PASSWORD").required().asString(),
    DB_DATABASE:                get("DB_DATABASE").default("postgres").asString(),
    DB_SCHEMA:                  get("DB_SCHEMA").default("public").asString(),
    DEFAULT_API_PREFIX:         get("DEFAULT_API_PREFIX").asString(),
}