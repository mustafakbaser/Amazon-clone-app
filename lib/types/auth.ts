export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string; // In a real app, this would be hashed
  addresses: Address[];
  createdAt: string;
}

export interface Address {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  zipCode: string;
  isDefault: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}