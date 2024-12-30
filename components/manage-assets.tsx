"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Asset, AssetClassification, AllocationStatus } from "@/lib/types";
import { createAsset } from "@/lib/api";

export function ManageAssets() {
  const [loading, setLoading] = useState(false);
  const form = useForm<Omit<Asset, "id" | "createdAt" | "updatedAt">>();

  const onSubmit = async (data: Omit<Asset, "id" | "createdAt" | "updatedAt">) => {
    setLoading(true);
    try {
      await createAsset(data);
      form.reset();
    } catch (error) {
      console.error("Error creating asset:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="classification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Classification</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select classification" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(AssetClassification).map((classification) => (
                      <SelectItem key={classification} value={classification}>
                        {classification}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Make</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Add other form fields similarly */}
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Asset"}
        </Button>
      </form>
    </Form>
  );
}