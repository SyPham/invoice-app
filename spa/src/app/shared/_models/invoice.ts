export interface Invoice {
  id: number;
  invoiceNo: string;
  other1: string;
  other2: string;
  carrier: string;
  description: string;
  vesselName: string;
  statusCode: string;
  containerID: number;
  containerNo: string;
  blno: string;
  companyID: number;
  eta: Date | null;
  etd: Date | null;
  invoiceDate: Date;
  updatedTime: Date | null;
  createdBy: number;
  updatedBy: number;
}
