import { CommonResponseBody } from "./CommonResponseBody";

export interface ErrorBody {
    private: string,
    public: CommonResponseBody,
    errorObject?: Error
}