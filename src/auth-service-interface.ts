export abstract class AuthServiceInterface {
  abstract signin(): Promise<any>;
  abstract signout(): Promise<any>;
}
