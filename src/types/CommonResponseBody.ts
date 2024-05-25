export class CommonResponseBody {
    public status: string;

    public constructor(
        public ok: boolean,
        public code: number,
        public data: {}
    ) {
        this.status = ok ? "success" : "error";
    }
}