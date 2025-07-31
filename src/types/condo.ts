export interface CondoProject {
  id: string;
  name: string;
  location: string;
  developer: string;
  image: string;
  description: string;
  totalUnits: number;
  availableUnits: number;
  priceRange: {
    min: number;
    max: number;
  };
  completionDate: string;
  facilities: string[];
}

export interface CondoUnit {
  id: string;
  projectId: string;
  unitNumber: string;
  floor: number;
  type: string;
  size: number; // square meters
  bedrooms: number;
  bathrooms: number;
  price: number;
  pricePerSqm: number;
  status: 'available' | 'reserved' | 'sold';
  features: string[];
  view: string;
  balconySize?: number;
}