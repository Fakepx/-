export interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Quotation {
  id: string;
  date: string;
  number: string;
  customerName: string;
  customerAddress: string;
  items: QuotationItem[];
  total: number;
  notes: string;
}