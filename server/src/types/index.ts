export interface User {
  id: string;
  role: 'PATIENT' | 'DOCTOR' | 'PHARMACY' | 'ADMIN';
  email?: string;
  phone?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient {
  id: string;
  userId: string;
  dob?: Date;
  gender?: string;
  village?: string;
  address?: string;
  bloodGroup?: string;
  allergies?: string;
  existingConditions?: string;
  offlineKey?: string;
}

export interface Doctor {
  id: string;
  userId: string;
  regNo?: string;
  specializations: string[];
  qualifications?: string;
  languages: string[];
  available: any;
  telemedicineEnabled: boolean;
}

export interface Pharmacy {
  id: string;
  userId: string;
  name: string;
  licenseNo?: string;
  address?: string;
  contactNumber?: string;
  openingHours: any;
  inventoryShared: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduledTime: Date;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  mode: 'VIDEO' | 'AUDIO' | 'IN_PERSON';
}

export interface InventoryItem {
  id: string;
  pharmacyId: string;
  medicineName: string;
  brand?: string;
  batchNo?: string;
  expiryDate?: Date;
  quantity: number;
  price: number;
}

export interface SymptomCheckerRequest {
  symptoms: string[];
  age: number;
  gender: string;
  severity: number;
}

export interface SymptomCheckerResponse {
  possibleConditions: string[];
  urgencyLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY';
  recommendations: string[];
  shouldSeeDoctor: boolean;
}