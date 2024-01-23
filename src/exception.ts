export class ReactAuthException extends Error {
  constructor(message: string) {
    super(`react-auth: ${message}`);
  }
}
