import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT:                       get("PORT").required().asPortNumber(),
    DB_HOST:                    get("DB_HOST").required().asString(),
    DB_PORT:                    get("DB_PORT").required().asPortNumber(),
    DB_USER:                    get("DB_USER").required().asString(),
    DB_PASSWORD:                get("DB_PASSWORD").required().asString(),
    DB_DATABASE:                get("DB_DATABASE").required().asString(),
    DEFAULT_API_PREFIX:         get("DEFAULT_API_PREFIX").asString(),
}