export default class CustomError extends Error{
  constructor({ name ,cause, message}) {
    super(message)
    this.name = name;
    this.cause = cause;
  }
}

