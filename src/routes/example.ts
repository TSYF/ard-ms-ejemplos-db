import { ErrorBody } from '@/types/ErrorBody';
import { CommonResponseBody } from '@/types/CommonResponseBody';
import express from 'express';
import { Example } from '../types/Example';
import { db } from '@/db';
import { exampleModel } from '@/db/schemas';
import { eq, inArray } from 'drizzle-orm';
import { updateImages, uploadImages } from '@/utils';
const router = express.Router();

//* Index
router.get(
    "/",
    async (req, res) => {
        const examples: Example[] = await db
            .select()
            .from(exampleModel);
        
        if (Array.isArray(examples)) {
            res.status(200).send(examples);
        } else {
            const CODE = 500;
            const error: ErrorBody = {
                private: "La lista de ejemplos no pasa el typecheck de array en Index",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                )
            }
            console.log(error.private);
            res.status(CODE).send(error.public);
        }
    }
);

//* Show
router.get(
    "/:id",
    async (req, res) => {
        const { id } = req.params;

        const example: Example = (await db
            .select()
            .from(exampleModel)
            .where(eq(exampleModel.id, +id)))[0];
        
        console.log(example)
        console.log(id)
        res.status(200).send(example);
    }
);

//* ShowList
router.get(
    "/list/:ids",
    async (req, res) => {
        const { ids } = req.body;

        const examples: Example[] = await db
            .select()
            .from(exampleModel)
            .where(inArray(exampleModel.id, ids.split(",")));
            
        res.status(200).send(examples);
    }
);

//* Store
router.post(
    "/",
    async (req, res) => {

        const example = req.body;

        example.image = (await uploadImages([ example.image ]))[0];

        const insertedExample = (await db.insert(exampleModel).values(example).returning())[0];

        if (!insertedExample) {
            const CODE = 500;

            const error: ErrorBody = {
                private: "Inserción no retorna fila insertada",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                )
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
            return;
        }

        res.status(200).send(insertedExample);
    }
)

//* Update
router.put(
    "/:id",
    async (req, res) => {
        const { id } = req.params;

        const example = req.body;
        example.image = (await updateImages(+id, [ example.image ]))[0];

        const updatedExample = (await db
            .update(exampleModel)
            .set(example)
            .where(eq(exampleModel.id, +id))
            .returning())[0];

        if (!updatedExample) {
            const CODE = 500;

            const error: ErrorBody = {
                private: "Actualización no retorna fila actualizada",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                )
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
            return;
        }

        res.status(200).send(updatedExample);
    }
)

//* Delete
router.delete(
    "/:id",
    async (req, res) => {
        const { id } = req.params;

        const example = (await db
            .delete(exampleModel)
            .where(eq(exampleModel.id, +id))
            .returning())[0];

        if (!example) {
            const CODE = 500;

            const error: ErrorBody = {
                private: "Eliminación no retorna fila eliminada",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                )
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
            return;
        }

        res.status(200).send(example);
    }
)

export default router;