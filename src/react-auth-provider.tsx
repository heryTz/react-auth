import { PropsWithChildren, useEffect, useState } from "react";
import {
  AuthenticationStatus,
  ReactAuthContext,
  ReactAuthContextValue,
} from "./react-auth-context";
import { ReactAuthException } from ".";
import { AuthServiceContract, AuthStorageContract } from "./contract";

type ReactAuthProviderProps = PropsWithChildren<
  Pick<ReactAuthContextValue, "service" | "storage">
>;

export function ReactAuthProvider({
  children,
  service,
  storage,
}: ReactAuthProviderProps) {
  if (service instanceof AuthServiceContract === false) {
    throw new ReactAuthException(
      `service should extends "AuthServiceContract"`
    );
  }
  if (storage instanceof AuthStorageContract === false) {
    throw new ReactAuthException(
      `storage should extends "AuthServiceContract"`
    );
  }

  const [session, setSession] =
    useState<ReactAuthContextValue["session"]>(undefined);

  useEffect(() => {
    storage
      .get()
      .then(setSession)
      .catch(() => setSession(null));
  }, []);

  const signin = async () => {
    try {
      const data = await service.signin();
      await storage.save(data);
      setSession(data);
    } catch (error) {
      setSession(null);
    }
  };

  const signout = async () => {
    try {
      await service.signout();
      await storage.delete();
      setSession(null);
    } catch (error) {}
  };

  let status: AuthenticationStatus = "loading";
  if (session === null) status = "unauthenticated";
  else if (session) status = "authenticated";

  return (
    <ReactAuthContext.Provider
      value={{ service, storage, session, status, signin, signout }}
    >
      {children}
    </ReactAuthContext.Provider>
  );
}
