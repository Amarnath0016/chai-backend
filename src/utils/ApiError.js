class ApiError extends Error {
   constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
      this.data = null;
      this.message = message;
      this.success = false;
      this.errors = errors || null;
   }

}

export default ApiError; 