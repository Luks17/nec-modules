type ErrorCodes = "INV_USER" | "INV_PASSWD" | "NO_AUTH" | "NOT_FOUND";

export class ServerError extends Error {
  public code: ErrorCodes;
  constructor(code: ErrorCodes, msg: string) {
    super(msg);
    this.code = code;
  }

  public toString() {
    return "Error: " + this.code + " - " + this.message;
  }
}
