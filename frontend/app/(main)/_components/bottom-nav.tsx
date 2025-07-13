"use client";
import { Button } from "@/components/ui/button";
import { CloudRainWind, LogOut, Plus, SquareDashed, Trash } from "lucide-react";
import React from "react";
import { useMap } from "./map-provider";
import { StyleType } from "@/types/map.type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { logout } from "@/lib/session/logout";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function BottomNavbar() {
  const styleImgs: Record<StyleType, string> = {
    positron: "/positron.png",
    satellite: "/satellite.png",
  };
  const { controls, isDrawing, selectedStyle } = useMap();

  const switchDrawing = () => {
    if (isDrawing) controls.stopDrawing();
    else controls.startDrawing();
  };

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      toast.error(error);
      return;
    }
    window.location.href = "/login";
  };

  return (
    <div className="fixed border h-auto flex items-center gap-3 bottom-5 rounded-lg bg-white px-4 py-3 z-10 left-1/2 -translate-x-1/2">
      <Button
        onClick={switchDrawing}
        size={"icon"}
        variant={"outline"}
        className={cn({
          "bg-neutral-200": isDrawing,
        })}
      >
        <SquareDashed />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <button className="rounded-full border-2  cursor-pointer">
            <img
              src={styleImgs[selectedStyle]}
              className="rounded-full size-9 object-cover select-none "
            />
          </button>
        </PopoverTrigger>
        <PopoverContent className="flex py-2 items-center gap-4 w-fit">
          {Object.entries(styleImgs).map(([k, v], idx) => (
            <button
              onClick={() => controls.changeStyle(k as any)}
              key={k}
              className="rounded-full  cursor-pointer border-2 aspect-square"
            >
              <img
                src={v}
                className="rounded-full size-9 object-cover select-none"
              />
            </button>
          ))}
        </PopoverContent>
      </Popover>
      <Button onClick={handleLogout} size={"icon"} variant={"outline"}>
        <LogOut />
      </Button>
    </div>
  );
}
