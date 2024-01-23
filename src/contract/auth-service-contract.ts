export abstract class AuthServiceContract {
  abstract signin(): Promise<unknown>;
  abstract signout(): Promise<void>;
}
