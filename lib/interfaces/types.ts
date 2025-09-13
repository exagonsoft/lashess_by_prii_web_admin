export interface IFeature {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  published: boolean;
}

export interface IService {
  id: string;
  name: string;
  price: number;
  durationMin: number;
  imageUrl: string;
  order: number;
  active: boolean;
}

export interface IGallery {
  _id: string;
  imageUrl: string;
  alt: string;
  order: number;
  published: boolean;
}

export interface IReview {
  _id: string;
  name: string;
  text: string;
  avatarUrl?: string;
  published: boolean;
}

export interface IUser {
  id: string;
  uuid: string;
  name: string;
  email: string;
  photoUrl?: string;
  provider?: string;
  createdAt?: string;
}

export interface IStylist {
  _id?: string;
  name: string;
  contact: string;
  address: string;
  picture?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type BookingStatus = "scheduled" | "canceled" | "processed";

export interface IToolUsage {
  toolId: string;
  name?: string;
  quantity: number;
  unit?: string;
}

export interface IBooking {
  id: string;
  serviceId?: string; // relation to Service
  customerName: string;
  customerEmail?: string;
  serviceName: string;
  stylistName?: string;
  scheduledAt: string; // ISO date string
  status: BookingStatus;
  price?: number;
  toolsUsed?: IToolUsage[];
  notes?: string;
}

export interface ITool {
  id: string;
  name: string;
  sku?: string;
  stock: number;
  unit?: string; // e.g., ml, pcs
  type?: string; // glue, lashes, etc.
  active: boolean;
}

export interface IOffer {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  active: boolean;
  order: number;
  startsAt?: string; // ISO date
  endsAt?: string; // ISO date
}
