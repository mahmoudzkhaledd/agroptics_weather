"use client";
import CustomFormField, {
  FormFieldType,
} from "@/components/general/custom-form-field";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddFieldSchema, addFieldSchema } from "@/types/shemas/addField.schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { axiosClient } from "@/lib/axios";
import { toast } from "sonner";
import { useMap } from "./map-provider";
import { AxiosError } from "axios";
import useFields from "../hooks/useFields";
import { FieldType } from "@/types/field.type";

export default function AddFieldDialog({
  onClose,
  feature,
}: {
  onClose: () => void;
  feature: FieldType;
}) {
  const [loading, startTrans] = useTransition();
  const { controls } = useMap();

  const { refetch } = useFields(false);
  const form = useForm<AddFieldSchema>({
    defaultValues: {
      area: feature.area,
      feature: feature.geojson,
      description: feature.description,
      name: feature.name,
      id: feature.id,
    },
    resolver: zodResolver(addFieldSchema),
  });

  const handleSubmit = (data: AddFieldSchema) => {
    startTrans(async () => {
      try {
        const res = feature.fetched
          ? await axiosClient.put("/field", {
              name: data.name,
              description: data.description,
              id: data.id,
            })
          : await axiosClient.post("/field", data);
        const js =
          typeof res.data === "string" ? JSON.parse(res.data) : res.data;
        console.log({
          data: res.data,
          eror: res.data.error,
          js,
        });
        if (res?.data.error) {
          toast.error(res.data.error);
          return;
        }
        toast.success(
          feature.fetched
            ? "Field data updated successfully"
            : "Field added successfully"
        );
        refetch();
        closeDialog();
      } catch (ex) {
        if (ex instanceof AxiosError) {
          const response = ex.response;
          if (response?.data?.error) {
            toast.error(response.data.error);
          }
        }
      }
    });
  };
  const closeDialog = () => {
    controls.deleteSelected();
    onClose();
  };
  return (
    <Dialog onOpenChange={closeDialog} open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new field</DialogTitle>
          <DialogDescription>
            Enter the field name and description to add the new field.
          </DialogDescription>
        </DialogHeader>
        {feature.area <= 100 ? (
          <Form className="w-full" disabled={loading} {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <div className="space-y-1">
                <Label>Area</Label>
                <Input disabled readOnly defaultValue={`${feature.area}`} />
              </div>
              <CustomFormField
                label="Field Name"
                control={form.control}
                name="name"
              />
              <CustomFormField
                label="Description"
                control={form.control}
                name="description"
                fieldType={FormFieldType.TEXTAREA}
              />
              <Button loading={loading} type="submit" className="w-full">
                {feature.fetched ? "Update field" : "Add field"}
              </Button>
            </form>
          </Form>
        ) : (
          <span className="text-center text-sm font-semibold">
            The area must be at most 100 acres, your field area is{" "}
            {feature.area}
          </span>
        )}
      </DialogContent>
    </Dialog>
  );
}
