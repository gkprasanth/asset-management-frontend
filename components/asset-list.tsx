"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Asset, AllocationStatus } from "@/lib/types";
// import { fetchAssets } from "@/lib/api";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AssetList() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const loadAssets = async () => {
  //     try {
  //       const data = await fetchAssets();
  //       setAssets(data);
  //       setError(null);
  //     } catch (err) {
  //       setError('Failed to load assets. Please try again later.');
  //       console.error('Error fetching assets:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadAssets();
  // }, []);

  const getStatusColor = (status: AllocationStatus) => {
    switch (status) {
      case AllocationStatus.InUse:
        return "bg-green-500";
      case AllocationStatus.InStore:
        return "bg-blue-500";
      case AllocationStatus.Scrap:
        return "bg-red-500";
      case AllocationStatus.InRepair:
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return <div className="flex justify-center p-4">Loading assets...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset Code</TableHead>
            <TableHead>Classification</TableHead>
            <TableHead>Make/Model</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned To</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>{asset.assetCode}</TableCell>
              <TableCell>{asset.classification}</TableCell>
              <TableCell>{`${asset.make} ${asset.assetModel}`}</TableCell>
              <TableCell>{asset.location}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(asset.allocationStatus)}>
                  {asset.allocationStatus}
                </Badge>
              </TableCell>
              <TableCell>{asset.employee?.empName || "Not Assigned"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}