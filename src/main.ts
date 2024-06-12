import express from 'express';
const morgan = require("morgan");
import exampleRouter  from '@/routes/example';
import { envs } from './config/env';
const app = express();

const { PORT, DEFAULT_API_PREFIX, BODY_SIZE_LIMIT } = envs;
app.use(morgan("combined"))
app.use(express.json({ limit: BODY_SIZE_LIMIT }));

app.use(`${DEFAULT_API_PREFIX}`, exampleRouter);
app.listen(PORT, () => console.log("MS-EJEMPLOS-DB STARTED"));