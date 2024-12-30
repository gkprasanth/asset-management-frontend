"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Asset } from "@/lib/types";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AssetAllocation() {
  const [assetId, setAssetId] = useState("");
  const [empId, setEmpId] = useState("");
  const [allocatedAssets, setAllocatedAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleAllocate = async () => {
    if (!assetId || !empId) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/assets/allocate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assetId: parseInt(assetId), empId }),
      });
      const data = await response.json();
      
      if (response.ok) {
        setAlert({ type: "success", message: "Asset allocated successfully" });
        fetchAllocatedAssets();
      } else {
        setAlert({ type: "error", message: data.message });
      }
    } catch (error) {
      setAlert({ type: "error", message: "Error allocating asset" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeallocate = async (assetId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/assets/deallocate/${assetId}`,
        {
          method: "DELETE",
        }
      );
      
      if (response.ok) {
        setAlert({ type: "success", message: "Asset deallocated successfully" });
        fetchAllocatedAssets();
      } else {
        const data = await response.json();
        setAlert({ type: "error", message: data.message });
      }
    } catch (error) {
      setAlert({ type: "error", message: "Error deallocating asset" });
    }
  };

  const fetchAllocatedAssets = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/assets/allocated");
      const data = await response.json();
      setAllocatedAssets(data);
    } catch (error) {
      console.error("Error fetching allocated assets:", error);
    }
  };

  return (
    <div className="space-y-6">
      {alert && (
        <Alert variant={alert.type === "success" ? "default" : "destructive"}>
          {alert.type === "success" ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {alert.type === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Asset ID"
          value={assetId}
          onChange={(e) => setAssetId(e.target.value)}
        />
        <Input
          placeholder="Employee ID"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
        />
      </div>

      <Button onClick={handleAllocate} disabled={loading}>
        Allocate Asset
      </Button>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset ID</TableHead>
              <TableHead>Classification</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allocatedAssets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>{asset.id}</TableCell>
                <TableCell>{asset.classification}</TableCell>
                <TableCell>{asset.employee?.empName}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeallocate(asset.id)}
                  >
                    Deallocate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}