import { PropsWithChildren } from "react";

type ReactAuthProviderProps = PropsWithChildren<{}>;

export function ReactAuthProvider({ children }: ReactAuthProviderProps) {
  return <>{children}</>;
}
