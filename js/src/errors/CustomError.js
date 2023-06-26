/*export default class CustomError {
  static createError({ name = "Error", cause, message, code, status }) {
    const error = new Error(message, { cause });
    error.name = name;
    error.code = code;
    error.status = status;
    return error;
  }
}*/

export default class CustomError {
  static generateCustomError({ name, message, cause }) {
    const customError = new Error(message, { cause });
    customError.name = name;
    throw customError;
  }
}




