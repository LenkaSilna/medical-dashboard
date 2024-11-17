import React, { useState } from 'react'
import { Patient, Medication, MedicalHistoryEntry } from '@/app/types/patient'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

type PatientCardProps = Pick<
  Patient,
  | 'firstName'
  | 'lastName'
  | 'age'
  | 'dateOfBirth'
  | 'gender'
  | 'bloodType'
  | 'weight'
  | 'height'
  | 'contactInfo'
  | 'lastDiagnosis'
  | 'lastExamDate'
  | 'allergies'
  | 'medications'
  | 'medicalHistory'
>

const PatientCard: React.FC<PatientCardProps> = ({
  firstName,
  lastName,
  age,
  dateOfBirth,
  gender,
  bloodType,
  weight,
  height,
  contactInfo,
  lastDiagnosis,
  lastExamDate,
  allergies = [],
  medications = [],
  medicalHistory = [],
}) => {
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(false)
  const [isMedicalInfoOpen, setIsMedicalInfoOpen] = useState(true)
  const [isMedicationsOpen, setIsMedicationsOpen] = useState(false)

  const name = `${firstName} ${lastName}`

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border divide-y divide-gray-200">
      {/* Base info */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Age: {age}</p>
            {dateOfBirth && (
              <p className="text-sm text-gray-600">Birth Date: {dateOfBirth}</p>
            )}
            {gender && (
              <p className="text-sm text-gray-600">Gender: {gender}</p>
            )}
          </div>
          <div>
            {bloodType && (
              <p className="text-sm text-gray-600">Blood Type: {bloodType}</p>
            )}
            {weight && (
              <p className="text-sm text-gray-600">Weight: {weight} kg</p>
            )}
            {height && (
              <p className="text-sm text-gray-600">Height: {height} cm</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="py-4">
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => setIsContactInfoOpen(!isContactInfoOpen)}
        >
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          {isContactInfoOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {isContactInfoOpen && (
          <div className="text-sm text-gray-600">
            <p>Email: {contactInfo.email}</p>
            <p>Phone: {contactInfo.phone}</p>
            <p>
              Address: {contactInfo.address.street}, {contactInfo.address.city},{' '}
              {contactInfo.address.zipCode}
            </p>
          </div>
        )}
      </div>

      {/* Medical Information */}
      <div className="py-4">
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => setIsMedicalInfoOpen(!isMedicalInfoOpen)}
        >
          <h3 className="text-lg font-semibold mb-2">Medical Information</h3>
          {isMedicalInfoOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {isMedicalInfoOpen && (
          <div className="text-sm text-gray-600">
            <p>Last Diagnosis: {lastDiagnosis}</p>
            {lastExamDate && <p>Last Exam Date: {lastExamDate}</p>}

            {/* Medical History Section */}
            {medicalHistory.length > 0 && (
              <div className="mt-4">
                <h4 className="font-bold mb-2">Medical History:</h4>
                <div className="space-y-2">
                  {medicalHistory.map(
                    (entry: MedicalHistoryEntry, index: number) => (
                      <div key={index} className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-600">
                          Date: {entry.date}
                        </p>
                        <p className="text-sm text-gray-600">
                          Condition: {entry.condition}
                        </p>
                        <p className="text-sm text-gray-600">
                          Treatment: {entry.treatment}
                        </p>
                        {entry.notes && (
                          <p className="text-sm text-gray-600">
                            Notes: {entry.notes}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Allergies Section */}
            {allergies.length > 0 && (
              <div className="mt-4">
                <h4 className="font-bold mb-2">Allergies:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {allergies.map((allergy: string, index: number) => (
                    <li key={index}>{allergy}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Medication */}
      <div className="py-4">
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => setIsMedicationsOpen(!isMedicationsOpen)}
        >
          <h3 className="text-lg font-semibold mb-2">Current Medications</h3>
          {isMedicationsOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {isMedicationsOpen && (
          <div className="space-y-2 text-sm text-gray-600">
            {medications.map((medication: Medication, index: number) => (
              <div key={index} className="bg-gray-50 p-2 rounded">
                <p className="font-medium">{medication.name}</p>
                <p>Dosage: {medication.dosage}</p>
                <p>Frequency: {medication.frequency}</p>
                <p>Started: {medication.startDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PatientCard
