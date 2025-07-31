import { CondoProject, CondoUnit } from '@/types/condo';
import condo1 from '@/assets/condo-1.jpg';
import condo2 from '@/assets/condo-2.jpg';
import condo3 from '@/assets/Map10K.jpg';

export const condoProjects: CondoProject[] = [
  {
    id: '1',
    name: 'The Lux Residences',
    location: 'สุขุมวิท 24, กรุงเทพฯ',
    developer: 'Premium Development Co.',
    image: condo1,
    description: 'คอนโดมิเนียมหรูระดับพรีเมียม ใจกลางสุขุมวิท พร้อมสิ่งอำนวยความสะดวกครบครัน',
    totalUnits: 180,
    availableUnits: 45,
    priceRange: {
      min: 8500000,
      max: 25000000
    },
    completionDate: '2024',
    facilities: ['สระว่ายน้ำ', 'ฟิตเนส', 'สวนสกายการ์เดน', 'ห้องประชุม', 'รปภ. 24 ชม.']
  },
  {
    id: '2',
    name: 'Garden View Condo',
    location: 'อารีย์, กรุงเทพฯ',
    developer: 'Green Living Co.',
    image: condo2,
    description: 'คอนโดสไตล์รีสอร์ท ล้อมรอบด้วยสวนสวย บรรยากาศเงียบสงบ',
    totalUnits: 120,
    availableUnits: 28,
    priceRange: {
      min: 4500000,
      max: 12000000
    },
    completionDate: '2024',
    facilities: ['สระว่ายน้ำ', 'สวนส่วนกลาง', 'ลานบาร์บีคิว', 'ห้องเด็กเล่น', 'จอดรถ']
  },
  {
    id: '3',
    name: 'Metro Heights',
    location: 'อโศก, กรุงเทพฯ',
    developer: 'City Development Ltd.',
    image: condo3,
    description: 'คอนโดใหม่ติด BTS อโศก เดินทางสะดวก เข้าถึงศูนย์กลางธุรกิจได้ง่าย',
    totalUnits: 240,
    availableUnits: 72,
    priceRange: {
      min: 6800000,
      max: 18500000
    },
    completionDate: '2025',
    facilities: ['ลิฟต์ความเร็วสูง', 'ลานจอดรถ', 'ร้านค้า', 'โครงข่าย WiFi', 'CCTV']
  }
];

export const condoUnits: CondoUnit[] = [
  // The Lux Residences Units
  {
    id: '1-1',
    projectId: '1',
    unitNumber: '1205',
    floor: 12,
    type: '1 ห้องนอน',
    size: 35,
    bedrooms: 1,
    bathrooms: 1,
    price: 8500000,
    pricePerSqm: 242857,
    status: 'available',
    features: ['บิ้วอิน', 'แอร์ในทุกห้อง', 'เครื่องใช้ไฟฟ้า'],
    view: 'วิวเมือง',
    balconySize: 6
  },
  {
    id: '1-2',
    projectId: '1',
    unitNumber: '1506',
    floor: 15,
    type: '2 ห้องนอน',
    size: 65,
    bedrooms: 2,
    bathrooms: 2,
    price: 15800000,
    pricePerSqm: 243077,
    status: 'available',
    features: ['บิ้วอิน', 'แอร์ในทุกห้อง', 'เครื่องใช้ไฟฟ้า', 'ระเบียงกว้าง'],
    view: 'วิวสวน',
    balconySize: 12
  },
  {
    id: '1-3',
    projectId: '1',
    unitNumber: '2002',
    floor: 20,
    type: '3 ห้องนอน',
    size: 95,
    bedrooms: 3,
    bathrooms: 3,
    price: 25000000,
    pricePerSqm: 263158,
    status: 'reserved',
    features: ['บิ้วอิน', 'แอร์ในทุกห้อง', 'เครื่องใช้ไฟฟ้า', 'ระเบียงใหญ่', 'ห้องแม่บ้าน'],
    view: 'วิวแม่น้ำ',
    balconySize: 18
  },
  
  // Garden View Condo Units
  {
    id: '2-1',
    projectId: '2',
    unitNumber: '0803',
    floor: 8,
    type: '1 ห้องนอน',
    size: 28,
    bedrooms: 1,
    bathrooms: 1,
    price: 4500000,
    pricePerSqm: 160714,
    status: 'available',
    features: ['บิ้วอิน', 'แอร์', 'ระเบียง'],
    view: 'วิวสวน',
    balconySize: 5
  },
  {
    id: '2-2',
    projectId: '2',
    unitNumber: '1204',
    floor: 12,
    type: '2 ห้องนอน',
    size: 55,
    bedrooms: 2,
    bathrooms: 2,
    price: 8200000,
    pricePerSqm: 149091,
    status: 'available',
    features: ['บิ้วอิน', 'แอร์ในทุกห้อง', 'ระเบียงใหญ่'],
    view: 'วิวสวน',
    balconySize: 10
  },
  {
    id: '2-3',
    projectId: '2',
    unitNumber: '1501',
    floor: 15,
    type: '3 ห้องนอน',
    size: 78,
    bedrooms: 3,
    bathrooms: 2,
    price: 12000000,
    pricePerSqm: 153846,
    status: 'sold',
    features: ['บิ้วอิน', 'แอร์ในทุกห้อง', 'ระเบียงใหญ่', 'ห้องแม่บ้าน'],
    view: 'วิวเมือง',
    balconySize: 15
  },

  // Metro Heights Units
  {
    id: '3-1',
    projectId: '3',
    unitNumber: '0705',
    floor: 7,
    type: '1 ห้องนอน',
    size: 32,
    bedrooms: 1,
    bathrooms: 1,
    price: 6800000,
    pricePerSqm: 212500,
    status: 'available',
    features: ['บิ้วอิน', 'แอร์', 'วิวสถานี BTS'],
    view: 'วิวเมือง',
    balconySize: 4
  },
  {
    id: '3-2',
    projectId: '3',
    unitNumber: '1208',
    floor: 12,
    type: '2 ห้องนอน',
    size: 58,
    bedrooms: 2,
    bathrooms: 2,
    price: 12500000,
    pricePerSqm: 215517,
    status: 'available',
    features: ['บิ้วอิน', 'แอร์ในทุกห้อง', 'ระเบียง'],
    view: 'วิวเมือง',
    balconySize: 8
  },
  {
    id: '3-3',
    projectId: '3',
    unitNumber: '1802',
    floor: 18,
    type: '3 ห้องนอน',
    size: 85,
    bedrooms: 3,
    bathrooms: 3,
    price: 18500000,
    pricePerSqm: 217647,
    status: 'available',
    features: ['บิ้วอิน', 'แอร์ในทุกห้อง', 'ระเบียงใหญ่', 'ห้องแม่บ้าน', 'วิวพาโนรามา'],
    view: 'วิวแม่น้ำ',
    balconySize: 16
  }
];
