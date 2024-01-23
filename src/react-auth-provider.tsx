import { PropsWithChildren, useEffect, useState } from "react";
import {
  AuthenticationStatus,
  ReactAuthContext,
  ReactAuthContextValue,
  ReactAuthSession,
} from "./react-auth-context";

type ReactAuthProviderProps = PropsWithChildren<
  Pick<ReactAuthContextValue, "service" | "storage">
>;

export function ReactAuthProvider({
  children,
  service,
  storage,
}: ReactAuthProviderProps) {
  const [session, setSession] = useState<ReactAuthSession>(undefined);

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
