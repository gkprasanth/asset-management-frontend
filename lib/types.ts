export type Employee = {
  id: number;
  empId: string;
  empName: string;
  department: string;
  manager: string;
  managerId: string;
  hod: string;
  empPhone: string;
  location: string;
  createdAt: string;
  updatedAt: string;
};

export type Asset = {
  id: number;
  classification: AssetClassification;
  make: string;
  assetModel: string;
  purchaseDate: string;
  warranty: string;
  serviceTag: string;
  assetCode: string;
  location: string;
  costCenterCode: string;
  allocationStatus: AllocationStatus;
  empId?: string;
  employee?: Employee;
  createdAt: string;
  updatedAt: string;
};

export enum AssetClassification {
  Laptop = 'Laptop',
  Desktop = 'Desktop',
  Peripherals = 'Peripherals',
  Server = 'Server',
  Storage = 'Storage',
  TableLibraries = 'TableLibraries',
  SanSwitches = 'SanSwitches',
  Firewall = 'Firewall',
  L3Switches = 'L3Switches',
  L2SwitchesManaged = 'L2SwitchesManaged',
  L2SwitchesUnmanaged = 'L2SwitchesUnmanaged',
  POEManaged = 'POEManaged',
  POEUnmanaged = 'POEUnmanaged'
}

export enum AllocationStatus {
  InUse = 'InUse',
  InStore = 'InStore',
  Scrap = 'Scrap',
  InRepair = 'InRepair'
}



export interface User {
  id: string;
  username: string;
  email: string
  role: string;

}
