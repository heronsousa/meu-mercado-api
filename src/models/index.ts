export interface Nfce {
  id: string;
  key: string;
  store: string;
  city: string;
  state: string;
  neighborhood: string;
  date: Date;
  totalPrice: string;
  paymentMethod: string;
  userId: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  description: string;
  ncm: string;
  price: string;
  qtd: string;
  unity: string;
  nfceId: string;
  categoryId: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  description: string;
  code: string;
  color: string;
}

export interface CreateNfceRequest {
  nfce_key: string;
}

export interface NfceSummaryResponse {
  invoiceCount: number;
  totalAmount: number;
  averageValue: number;
  nfces: Array<{
    id: string;
    key: string;
    date: Date;
    store: string;
    total: string;
    productCount: number;
    categories: Array<{
      name: string;
      color: string;
    }>;
  }>;
}