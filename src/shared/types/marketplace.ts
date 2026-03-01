export interface Category {
  id: string;
  label: string;
  gradient: string;
  icon?: string;
}

export interface Lawyer {
  id: string;
  name: string;
  photo: string;
  specialization: string;
  experience?: string;
  priceFrom: number;
}
