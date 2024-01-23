export abstract class AuthStorageContract {
  abstract save(session: unknown): Promise<boolean>;
  abstract delete(): Promise<boolean>;
  abstract get(): Promise<unknown>;
}
