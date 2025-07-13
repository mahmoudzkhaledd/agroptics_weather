import RoutesGuard from "@/components/general/routes-guard";
import React from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoutesGuard>{children}</RoutesGuard>;
}
