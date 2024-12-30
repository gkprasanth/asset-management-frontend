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
import { Asset } from "@/lib/types";
import { fetchUserAssets } from "@/lib/api";

interface UserAssetsProps {
  userId: number;
}

export function UserAssets({ userId }: UserAssetsProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const data = await fetchUserAssets(userId);
        setAssets(data);
      } catch (error) {
        console.error("Error loading user assets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, [userId]);

  if (loading) return <div>Loading your assets...</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset Code</TableHead>
              <TableHead>Classification</TableHead>
              <TableHead>Make/Model</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Allocation Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>{asset.assetCode}</TableCell>
                <TableCell>{asset.classification}</TableCell>
                <TableCell>{`${asset.make} ${asset.assetModel}`}</TableCell>
                <TableCell>
                  <Badge>{asset.allocationStatus}</Badge>
                </TableCell>
                <TableCell>
                  {new Date(asset.updatedAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}