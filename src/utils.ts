export function matches(body: RequestBody, rules: Matcher) {
    // All keys of rules must be present, so we use that to check our body
    for (let attribute in rules) {
        // The type of value must be same as our rule
        // Not present would mean 'undefined'
        if (typeof body[attribute] !== rules[attribute]) {
            // We invalidate body as soon as we find our first invalid attribute
            return false;
        }
    }

    // All checked out, request body is OK
    return true;
}

export interface Matcher {
    [key: string]: string
}

export interface RequestBody {
    [key: string]: unknown
}