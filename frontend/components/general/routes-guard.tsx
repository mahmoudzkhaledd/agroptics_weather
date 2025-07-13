"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./loading-spinner";
import { axiosClient } from "@/lib/axios";

export default function RoutesGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axiosClient.get("/auth/verify-session");

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          window.location.href = "/login";
          return;
        }
      } catch (error) {
        window.location.href = "/login";
        return;
      } finally {
        setIsVerifying(false);
      }
    };

    verifySession();
  }, [router]);

  if (isVerifying) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null;
}
