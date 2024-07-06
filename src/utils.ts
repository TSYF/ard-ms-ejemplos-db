import { eq } from "drizzle-orm";
import { db } from "./db";
import { exampleModel } from "./db/schemas";
import { envs } from '@/config/env'

const { IMAGES_ENDPOINT } = envs

export async function uploadImages(images: string[]): Promise<string[]> {
    return await fetch(IMAGES_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fileList: images
        })
    }).then(res => res.json())
}

export async function updateImages(id: number, images: string[]): Promise<string[]> {
    const example = (await db
                            .select()
                            .from(exampleModel)
                            .where(eq(exampleModel.id, id)))[0];
    const payload   = {
        fileList: images,
        oldList: [ example.image ]
    }
    
    return await fetch(IMAGES_ENDPOINT, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())
}

export async function deleteImages(images: string[]): Promise<void> {
    const payload   = {
        uriList: images,
    }
    
    return await fetch(IMAGES_ENDPOINT, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())
}