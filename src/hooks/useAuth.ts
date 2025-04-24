// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


export function useAuth() {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (!isExpired) {
          setUser(decoded);
        } else {
          localStorage.removeItem("access_token");
          setUser(null);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
      }
    }

    setIsLoaded(true);
  }, []);

  return { user, isLoaded };
}