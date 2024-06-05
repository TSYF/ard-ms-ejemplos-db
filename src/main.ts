import express from 'express';
const morgan = require("morgan");
import exampleRouter  from '@/routes/example';
import { envs } from './config/env';
const app = express();

app.use(morgan("combined"))
app.use(express.json());
const { PORT, DEFAULT_API_PREFIX } = envs;

app.use(`${DEFAULT_API_PREFIX}`, exampleRouter);
app.listen(PORT, () => console.log("MS-EJEMPLOS-DB STARTED"));