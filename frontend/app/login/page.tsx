"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";
import { login } from "@/lib/session/login";

export default function LoginPage() {
  const [loading, startTrans] = useTransition();

  const handleLogin = () => {
    startTrans(async () => {
      const res = await login();
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      window.location.href = "/";
    });
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={"flex flex-col gap-6"}>
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Click login button and you will be logged in with the default
                user.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <Button
                    loading={loading}
                    onClick={handleLogin}
                    type="submit"
                    className="w-full"
                  >
                    Login
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
