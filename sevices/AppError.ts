type ErrorOption = {
  type: string;
  message: string;
};

export class AppError extends Error {
  type: string;

  constructor(options: ErrorOption) {
    super(options.message);
    this.type = options.type;
  }
}
