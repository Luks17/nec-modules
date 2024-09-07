import { Lucia, TimeSpan } from "lucia";
import { TypeORMAdapter } from "./TypeORMAdapter";
import { cookies } from "next/headers";
import { cache } from "react";
import type { RoutePermissions } from "./Permissions";

export const lucia = new Lucia(new TypeORMAdapter(), {
  sessionExpiresIn: new TimeSpan(2, "w"),
  sessionCookie: {
    expires: false,
    attributes: { secure: process.env.NODE_ENV === "production" },
  },
  getUserAttributes: (attr) => ({ nome: attr.nome, role: attr.role }),
});

export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}

  return result;
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: UserAttributes;
  }
}

interface UserAttributes {
  nome: string;
  role: RoutePermissions;
}
