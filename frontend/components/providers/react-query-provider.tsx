"use client";
import { QueryClient } from "@tanstack/react-query";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
const client = new QueryClient({
  defaultOptions: {
    hydrate: { queries: { retry: 0 } },
    mutations: { retry: 0 },
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});
export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
