import { Matcher } from "@/utils";

export interface Example {
    id?: number,
    image: string,
    name: string,
    description: string,
}

export const exampleMatcher: Matcher = {
    image: "string",
    name: "string",
    description: "string",
};