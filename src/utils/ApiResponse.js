class ApiResponse {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static success(message, data) {
    return new ApiResponse("success", message, data);
  }

  static error(message, data) {
    return new ApiResponse("error", message, data);
  }
}

export default ApiResponse;