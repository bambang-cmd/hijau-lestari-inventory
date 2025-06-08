
export interface InventoryItem {
  id: string;
  name: string;
  category: WasteCategory;
  description: string;
  quantity: number;
  unit: string;
  condition: 'Baik' | 'Rusak' | 'Perlu Diperbaiki';
  location: string;
  imageUrl?: string;
  dateAdded: Date;
  lastUpdated: Date;
  estimatedValue?: number;
}

export type WasteCategory = 
  | 'Aki'
  | 'Elektronik'
  | 'Kaca'
  | 'Kaleng'
  | 'Kain'
  | 'Minyak & Oli'
  | 'Plastik'
  | 'Styrofoam'
  | 'Kardus'
  | 'Kertas'
  | 'Kayu & Perabotan'
  | 'Besi'
  | 'Kuningan'
  | 'Aluminium'
  | 'Tembaga';

export const wasteCategories: WasteCategory[] = [
  'Aki',
  'Elektronik',
  'Kaca',
  'Kaleng',
  'Kain',
  'Minyak & Oli',
  'Plastik',
  'Styrofoam',
  'Kardus',
  'Kertas',
  'Kayu & Perabotan',
  'Besi',
  'Kuningan',
  'Aluminium',
  'Tembaga'
];

export const categoryColors: Record<WasteCategory, string> = {
  'Aki': 'bg-red-100 text-red-800 border-red-200',
  'Elektronik': 'bg-blue-100 text-blue-800 border-blue-200',
  'Kaca': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  'Kaleng': 'bg-gray-100 text-gray-800 border-gray-200',
  'Kain': 'bg-purple-100 text-purple-800 border-purple-200',
  'Minyak & Oli': 'bg-amber-100 text-amber-800 border-amber-200',
  'Plastik': 'bg-green-100 text-green-800 border-green-200',
  'Styrofoam': 'bg-pink-100 text-pink-800 border-pink-200',
  'Kardus': 'bg-orange-100 text-orange-800 border-orange-200',
  'Kertas': 'bg-slate-100 text-slate-800 border-slate-200',
  'Kayu & Perabotan': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Besi': 'bg-stone-100 text-stone-800 border-stone-200',
  'Kuningan': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Aluminium': 'bg-blue-100 text-blue-800 border-blue-200',
  'Tembaga': 'bg-orange-100 text-orange-800 border-orange-200'
};
