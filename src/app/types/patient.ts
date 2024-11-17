export interface Address {
  street: string
  city: string
  zipCode: string
}

export interface ContactInfo {
  email: string
  phone: string
  address: Address
}

export interface MedicalHistoryEntry {
  date: string
  condition: string
  treatment: string
  notes: string
}

export interface Medication {
  name: string
  dosage: string
  frequency: string
  startDate: string
}

export interface MRISlice {
  id: string
  imageUrl: string
  position: string
  description: string
  findings: string
  sequence: string
  sliceThickness: string
}

export interface MRIStudy {
  id: string
  date: string
  radiologist: string
  equipmentInfo: string
  slices: MRISlice[]
  conclusion: string
}

export interface Patient {
  id: string
  firstName: string
  lastName: string
  age: number
  dateOfBirth: string
  gender: 'male' | 'female'
  bloodType: string
  weight: number
  height: number
  contactInfo: ContactInfo
  lastDiagnosis: string
  lastExamDate: string
  medicalHistory: MedicalHistoryEntry[]
  allergies: string[]
  medications: Medication[]
  brainMRI: MRIStudy
}

export interface GetPatientsResponse {
  patients: Patient[]
}
