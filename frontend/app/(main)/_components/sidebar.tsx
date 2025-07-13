"use client";
import React, { useState } from "react";
import { ArrowLeft, RefreshCcw, Wheat } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import FieldComponent from "./field-component";
import useFields from "../hooks/useFields";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { data: fields, isLoading, isError, refetch } = useFields(false);

  const renderSkeletons = () => (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Card key={idx} className="border-gray-100">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="mt-1 h-3 w-3/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderError = () => (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="rounded-full bg-red-100 p-3">
        <Wheat className="h-6 w-6 text-red-600" />
      </div>
      <p className="mt-2 text-sm font-medium text-gray-900">
        Failed to load fields
      </p>
      <p className="text-xs text-gray-500">Please try again later</p>
    </div>
  );

  const renderEmpty = () => (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="rounded-full bg-gray-100 p-3">
        <Wheat className="h-6 w-6 text-gray-400" />
      </div>
      <p className="mt-2 text-sm font-medium text-gray-900">No fields found</p>
      <p className="text-xs text-gray-500">You haven't added any fields yet</p>
    </div>
  );

  const renderFields = () => (
    <div className="space-y-3">
      {fields?.map((field, idx) => (
        <FieldComponent key={idx} field={field} />
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "fixed left-4 top-5 z-10 flex flex-col overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-300 ease-in-out",
        {
          "bottom-5 w-[350px]": !collapsed,
          "w-fit": collapsed,
        }
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between border-b bg-gray-50/50 p-2",
          {
            "px-4 py-4": !collapsed,
          }
        )}
      >
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Wheat className="h-5 w-5 text-green-600" />
            <h1 className="text-lg font-semibold text-gray-800">My Fields</h1>
            <Button
              className="size-7"
              variant={"outline"}
              onClick={() => refetch()}
            >
              <RefreshCcw
                className={cn("size-3", {
                  "spin-in": isLoading,
                })}
              />
            </Button>
          </div>
        )}
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 hover:bg-gray-100"
        >
          <ArrowLeft
            className={cn("h-4 w-4 transition-transform duration-200", {
              "rotate-180": collapsed,
            })}
          />
        </Button>
      </div>

      {!collapsed && (
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              {isLoading
                ? renderSkeletons()
                : isError
                ? renderError()
                : fields && fields.length > 0
                ? renderFields()
                : renderEmpty()}
            </div>
          </div>

          {!isLoading && fields && fields.length > 0 && (
            <>
              <hr />
              <div className="p-3 bg-gray-50/50 text-xs text-gray-500 flex items-center justify-between">
                <span>
                  {fields.length} field{fields.length > 1 ? "s" : ""}
                </span>
                <span>
                  {fields
                    .reduce((acc, field) => acc + field.area, 0)
                    .toFixed(2)}{" "}
                  acres total
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
