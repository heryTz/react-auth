export abstract class AuthStorageInterface {
  abstract save(session: any): Promise<any>;
  abstract delete(): Promise<any>;
  abstract get(): Promise<any>;
}
