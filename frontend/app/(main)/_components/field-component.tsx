"use client";
import {
  CloudRain,
  Edit,
  Eye,
  EyeClosed,
  Trash,
  Wheat,
  ZoomIn,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldType } from "@/types/field.type";
import { useMap } from "./map-provider";
import { axiosClient } from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import useFields from "../hooks/useFields";
import WeatherDialog from "../_charts/weather-dialog";
export default function FieldComponent({ field }: { field: FieldType }) {
  const [openWeather, setOpenWeather] = useState<boolean>(false);
  const { controls, mapboxDraw } = useMap();
  const [loading, startTrans] = useTransition();
  const { refetch } = useFields(false);
  const [visible, setVisible] = useState<boolean>(!!mapboxDraw?.get(field.id!));
  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delte this field?")) return;
    startTrans(async () => {
      try {
        await axiosClient.delete<{ error?: string }>(`/field?fieldId=${id}`);
        refetch();
      } catch (ex: any) {
        if (ex instanceof AxiosError) {
          const response = ex.response;
          if (response?.data?.error) {
            toast.error(response.data.error);
          }
        }
      }
    });
  };
  const handleEdit = () => {
    controls.setAddedFeature(field);
  };
  const toggleHide = () => {
    const tmp = mapboxDraw?.get(field.id!);
    setVisible(!!!tmp);
    if (tmp) {
      mapboxDraw?.delete(field.id!);
    } else {
      mapboxDraw?.add(field.geojson);
    }
  };
  return (
    <Card className="group py-4 px-0 gap-2 border-gray-100 transition-all hover:border-gray-200 hover:shadow-sm">
      {openWeather && (
        <WeatherDialog
          onClose={() => setOpenWeather(false)}
          fieldId={field.id}
        />
      )}
      <CardHeader className="py-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="rounded-md bg-green-100 p-1.5 group-hover:bg-green-200 transition-colors">
              <Wheat className="h-3.5 w-3.5 text-green-600" />
            </div>
            <CardTitle className="text-sm break-words font-medium text-gray-900 truncate">
              {field.name}
            </CardTitle>
          </div>
          <Badge
            variant="secondary"
            className="text-xs font-medium bg-blue-100 text-blue-800 border-blue-200"
          >
            {field.area} acres
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-0  break-words">
        <CardDescription className="text-xs text-gray-600 leading-relaxed">
          {field.description}
        </CardDescription>
        <div className="flex mt-4 items-center gap-2">
          <Button
            onClick={() => controls.jumpToField(field.geojson.id!)}
            size={"icon"}
            variant={"outline"}
          >
            <ZoomIn />
          </Button>
          <Button onClick={handleEdit} size={"icon"} variant={"outline"}>
            <Edit />
          </Button>
          <Button onClick={toggleHide} size={"icon"} variant={"outline"}>
            {visible ? <EyeClosed /> : <Eye />}
          </Button>
          <Button
            onClick={() => setOpenWeather(true)}
            size={"icon"}
            variant={"outline"}
          >
            <CloudRain />
          </Button>

          <Button
            disabled={loading}
            onClick={() => handleDelete(field.geojson.id!.toString())}
            size={"icon"}
            variant={"outline"}
          >
            <Trash />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
