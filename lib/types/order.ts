export interface OrderAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  zipCode: string;
}

export interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: OrderAddress;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';