export interface Medicine {
  id: string;
  name: string;
  subtitle: string;
  quantity: string;
  price: number;
  mrp: number;
  discount: number;
  inStock: boolean;
  image: string;
  rating?: number;
  reviews?: number;
  orders?: string;
  highlights?: string[];
  batches?: any[];
  _id?: string;
  totalQuantity?: number;
  saltName?: string;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  line2: string;
  pincode: string;
  phone: string;
}

export const MEDICINES: Medicine[] = [
  {
    id: "telma-40",
    name: "Telma 40 Tablet",
    subtitle: "Telmisartan 40 mg",
    quantity: "10 Tablets",
    price: 170,
    mrp: 186,
    discount: 9,
    inStock: true,
    image: "/medicines/telma40.png",
    rating: 4.7,
    reviews: 8920,
    orders: "1.8K+",
    highlights: ["Controls high blood pressure", "Protects kidney function", "Once daily dosage"],
  },
  {
    id: "ecosprin-75",
    name: "Ecosprin 75 Tablet",
    subtitle: "Aspirin 75 mg",
    quantity: "15 Tablets",
    price: 60,
    mrp: 65,
    discount: 8,
    inStock: true,
    image: "/medicines/ecosprin75.png",
    rating: 4.6,
    reviews: 6340,
    orders: "2.1K+",
    highlights: ["Prevents blood clots", "Heart protective", "Trusted by cardiologists"],
  },
  {
    id: "thyronorm-50",
    name: "Thyronorm 50 Tablet",
    subtitle: "Levothyroxine 50 mcg",
    quantity: "10 Tablets",
    price: 32,
    mrp: 35,
    discount: 9,
    inStock: true,
    image: "/medicines/thyronorm50.png",
    rating: 4.8,
    reviews: 5120,
    orders: "1.5K+",
    highlights: ["Thyroid hormone replacement", "Once daily dose", "Consistent potency"],
  },
  {
    id: "liv52-ds",
    name: "Liv.52 DS Syrup",
    subtitle: "Liver Care",
    quantity: "200 ml",
    price: 145,
    mrp: 160,
    discount: 9,
    inStock: true,
    image: "/medicines/liv52ds.png",
    rating: 4.5,
    reviews: 9870,
    orders: "3.2K+",
    highlights: ["Protects liver cells", "Improves appetite", "Natural ingredients"],
  },
  {
    id: "crocin-650",
    name: "Crocin 650 Tablet",
    subtitle: "Paracetamol 650 mg",
    quantity: "15 Tablets",
    price: 25,
    mrp: 28,
    discount: 11,
    inStock: true,
    image: "/medicines/crocin650.png",
    rating: 4.8,
    reviews: 12345,
    orders: "2.5K+",
    highlights: ["Relieves headache, body pain & fever", "Gentle on stomach", "Trusted by millions of families"],
  },
  {
    id: "telma-40",
    name: "Telma 40 Tablet",
    subtitle: "Telmisartan 40 mg",
    quantity: "10 Tablets",
    price: 170,
    mrp: 186,
    discount: 9,
    inStock: true,
    image: "/medicines/telma40.png",
    rating: 4.7,
    reviews: 8920,
    orders: "1.8K+",
    highlights: ["Controls high blood pressure", "Protects kidney function", "Once daily dosage"],
  },
  {
    id: "ecosprin-75",
    name: "Ecosprin 75 Tablet",
    subtitle: "Aspirin 75 mg",
    quantity: "15 Tablets",
    price: 60,
    mrp: 65,
    discount: 8,
    inStock: true,
    image: "/medicines/ecosprin75.png",
    rating: 4.6,
    reviews: 6340,
    orders: "2.1K+",
    highlights: ["Prevents blood clots", "Heart protective", "Trusted by cardiologists"],
  },
  {
    id: "thyronorm-50",
    name: "Thyronorm 50 Tablet",
    subtitle: "Levothyroxine 50 mcg",
    quantity: "10 Tablets",
    price: 32,
    mrp: 35,
    discount: 9,
    inStock: true,
    image: "/medicines/thyronorm50.png",
    rating: 4.8,
    reviews: 5120,
    orders: "1.5K+",
    highlights: ["Thyroid hormone replacement", "Once daily dose", "Consistent potency"],
  },
  {
    id: "liv52-ds",
    name: "Liv.52 DS Syrup",
    subtitle: "Liver Care",
    quantity: "200 ml",
    price: 145,
    mrp: 160,
    discount: 9,
    inStock: true,
    image: "/medicines/liv52ds.png",
    rating: 4.5,
    reviews: 9870,
    orders: "3.2K+",
    highlights: ["Protects liver cells", "Improves appetite", "Natural ingredients"],
  },
  {
    id: "crocin-650",
    name: "Crocin 650 Tablet",
    subtitle: "Paracetamol 650 mg",
    quantity: "15 Tablets",
    price: 25,
    mrp: 28,
    discount: 11,
    inStock: true,
    image: "/medicines/crocin650.png",
    rating: 4.8,
    reviews: 12345,
    orders: "2.5K+",
    highlights: ["Relieves headache, body pain & fever", "Gentle on stomach", "Trusted by millions of families"],
  },
];

export const ADDRESSES: Address[] = [
  {
    id: "home",
    label: "Home",
    line1: "Near City Centre 2, New Town,",
    line2: "Kolkata - 700156",
    phone: "98745 67890",
    pincode: "700156",
  },
  {
    id: "work",
    label: "Work",
    line1: "Ecospace Building, New Town,",
    line2: "Kolkata - 700156",
    phone: "91254 56789",
    pincode: "700156",
  },
];

// types/product.ts

export interface SearchProduct {
  _id: string;
  productId: string;
  name: string;
  saltName: string;
  manufacturerName?: string;
  totalQuantity: number;
  category: string;
  dosageType: string;
  unitAmount?: string;
}

export interface ProductCreatedBy {
  name: string;
  role: string;
  email: string;
}

export interface CategoryGroup {
  category: string;
  medicines: ProductData[];
}

export interface ProductBatch {
  _id: string;
  createdBy: ProductCreatedBy;
  batchNumber: string;
  quantity: number;
  ptr: number;
  taxRate: string;
  amount: number;
  mrp: number;
  unitAmount: string;
  unit: string;
  expireAt: string;
  marginPercent: number;
  discount: number;
  billNumber: string;
  distributorName: string;
  manufacturer?: string;
  free?: number;
}

export interface ProductData {
  _id: string;
  createdBy: ProductCreatedBy;
  productId: string;
  unitAmountNumber: number[];
  unitAmount: string;
  name: string;
  description: string;
  productImage: string[];
  status: string;
  category: string;
  dosageType: string;
  hsnCode: string;
  saltName: string;
  location: string;
  batches: ProductBatch[];
  totalQuantity: number;
  billNumber: string;
  is_prescription_required: boolean;
  createdAt: string;
  updatedAt: string;
  manufacturerName: string;
}

export interface CategoryMedicineEntry {
  _id: string;
  category: string;
  medicine?: ProductData;
}

export interface CategoriesMedicinesResponse {
  success: boolean;
  count: number;
  data: CategoryGroup[];
}

export interface User {
  id: string;
  userfName: string;
  userlName: string;
  userEmail: string;
  userPhone?: string;
  gender?: string;
  dob?: string;
  role: string;
  permissions: string[];
  isActive?: boolean;
  isProfileComplete?: boolean;
}

export interface AuthResponse {
  success: boolean;
  user: User;
}