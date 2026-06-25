"use client";

import { useEffect, useState } from "react";

export interface SessionUser {
  id: string;
  userfName: string;
  userlName: string;
  userEmail: string;
  role: string;
}

export function useSession() {
  const [user, setUser] =
    useState<SessionUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await fetch(
          "/api/auth/session",
          {
            credentials: "include",
          }
        );

        const data =
          await response.json();

        if (data.authenticated) {
          setUser(data.user);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  return {
    user,
    loading,
  };
}