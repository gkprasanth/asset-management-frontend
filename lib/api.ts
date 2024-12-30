// Add these functions to the existing api.ts file

interface Asset {
  id: number;
  name: string;
  value: number;
  createdAt: string;
  updatedAt: string;
}

export async function fetchUserAssets(userId: number) {
  const response = await fetch(`http:localhost:8000/assets/user/${userId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function createAsset(assetData: Omit<Asset, "id" | "createdAt" | "updatedAt">) {
  const response = await fetch(`http:localhost:8000/assets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(assetData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}