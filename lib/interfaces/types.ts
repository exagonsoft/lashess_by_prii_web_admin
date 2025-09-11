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
