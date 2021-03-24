export interface Container {
  id: number;
  containerNo: string;
  size: string;
  sealNo: string;
  deliveryTo: string;
  deliveryDate: Date | null;
  gw: string;
  atn: string;
  deliveryOrder: string;
  invoiceID: number;
  createdTime: Date;
  updatedTime: Date | null;
  createdBy: number;
  updatedBy: number;
}
