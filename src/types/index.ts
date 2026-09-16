export type UserRole = 'owner' | 'admin' | 'cashier';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  storeId: string;
  role: UserRole;
  createdAt?: any;
}

export interface Store {
  id: string;
  ownerId: string;
  name: string;
  logoUrl?: string;
  logoPublicId?: string;
  address?: string;
  phone?: string;
  email?: string;
  receiptFooter?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface Category {
  id: string;
  storeId: string;
  name: string;
  active?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  price: number;
  cost?: number;
  costPrice?: number;
  stock: number;
  categoryId?: string;
  categoryName?: string;
  barcode?: string;
  imageUrl?: string;
  imagePublicId?: string;
  active?: boolean;
  isActive?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface TransactionItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  cost?: number;
  costPrice?: number;
}

export type TransactionStatus = 'completed' | 'cancelled';

export interface Transaction {
  id: string;
  storeId: string;
  cashierId?: string;
  cashierUid?: string;
  cashierName?: string;
  invoiceNumber: string;
  items: TransactionItem[];
  subtotal: number;
  discount?: number;
  total: number;
  payment: number;
  change: number;
  paymentMethod?: 'cash' | 'qris' | 'transfer' | string;
  notes?: string;
  status: TransactionStatus;
  cancelReason?: string;
  cancelledBy?: string;
  cancelledAt?: any;
  createdAt: any;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  costPrice?: number;
  quantity: number;
  subtotal: number;
  product?: Product;
}
