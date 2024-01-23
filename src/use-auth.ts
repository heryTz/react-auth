import { ReactAuthException } from "./exception";
import { useReactAuth } from "./react-auth-context";

export function useAuth() {
  const context = useReactAuth();
  if (!context) {
    throw new ReactAuthException(
      `You must wrap your components with "ReactAuthProvider" to use "useAuth".`,
    );
  }
  return context;
}
