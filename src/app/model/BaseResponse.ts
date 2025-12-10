export class BaseResponse {
    success: boolean;
    message: string;
    data: any;

    constructor(success: boolean, message: string, data: any) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    // static ok(data: any, message: string = "Success"): BaseResponse {
    //     return new BaseResponse(true, message, data);
    // }

    // static fail(message: string, data: any = null): BaseResponse {
    //     return new BaseResponse(false, message, data);
    // }
}
