export class CorsError extends Error {
    constructor(message: string) {
      super(message);
      this.message = message;
      this.name = 'CorsError';
    }
  }