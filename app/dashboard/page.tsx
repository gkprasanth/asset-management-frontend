"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetList } from "@/components/asset-list";
import { AssetAllocation } from "@/components/asset-allocation";
import { UserAssets } from "@/components/user-assets";
import { ManageAssets } from "@/components/manage-assets";
import { getStoredUser, isAdmin } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/");
      return;
    }
    // Parse the stored user JSON string into an object
    setUser(JSON.parse(storedUser));
  }, [router]);

  if (!user) return null;

  return (
    <div className="container mx-auto py-10 px-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Asset Management System</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, {user.username}</span>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem("user");
              router.push("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {isAdmin(user) && (
            <>
              <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
              <TabsTrigger value="manage">Manage Assets</TabsTrigger>
            </>
          )}
          {!isAdmin(user) && (
            <TabsTrigger value="my-assets">My Assets</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview" >
          <Card>
            <CardHeader>
              <CardTitle>Asset Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <AssetList />
            </CardContent>
          </Card>
        </TabsContent>

        {isAdmin(user) && (
          <>
            <TabsContent  value="allocation">
              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <AssetAllocation />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manage">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <ManageAssets />
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}

        {!isAdmin(user) && (
          <TabsContent value="my-assets">
            <Card>
              <CardHeader>
                <CardTitle>My Assets</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Pass userId correctly */}
                {user.id && <UserAssets userId={user.id} />}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}



 