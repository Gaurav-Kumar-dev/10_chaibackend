
class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        if (typeof statusCode !== 'number' || statusCode < 100 || statusCode > 599) {
            throw new Error('Invalid status code');
          }
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = this.isSuccess(statusCode);
        }
        isSuccess(statusCode) {
            return statusCode >= 200 && statusCode < 300;
          }

    }


export {ApiResponse};
