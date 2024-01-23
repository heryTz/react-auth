import { createContext, useContext } from "react";
import { AuthServiceContract } from "./contract/auth-service-contract";
import { AuthStorageContract } from "./contract/auth-storage-contract";

export type AuthenticationStatus =
  | "loading"
  | "unauthenticated"
  | "authenticated";

export type ReactAuthSession = {};

export type ReactAuthContextValue = {
  service: AuthServiceContract;
  storage: AuthStorageContract;
  session: ReactAuthSession | null | undefined;
  status: AuthenticationStatus;
  signin: () => Promise<void>;
  signout: () => Promise<void>;
};

export const ReactAuthContext = createContext<ReactAuthContextValue | null>(
  null
);

export function useReactAuth() {
  return useContext(ReactAuthContext);
}
