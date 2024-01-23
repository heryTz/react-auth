import { createContext, useContext } from "react";
import { AuthServiceInterface } from "./auth-service-interface";
import { AuthStorageInterface } from "./auth-storage-interface";

export type AuthenticationStatus =
  | "loading"
  | "unauthenticated"
  | "authenticated";

export type ReactAuthSession = {} | null | undefined;

export type ReactAuthContextValue = {
  service: AuthServiceInterface;
  storage: AuthStorageInterface;
  session: ReactAuthSession;
  status: AuthenticationStatus;
  signin: () => Promise<void>;
  signout: () => Promise<void>;
};

export const ReactAuthContext = createContext<ReactAuthContextValue | null>(
  null,
);

export function useReactAuth() {
  return useContext(ReactAuthContext);
}
