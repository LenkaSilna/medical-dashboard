'use client'

import { useQuery } from 'urql'
import { gql } from 'graphql-tag'
import PatientCard from './components/PatientCard'
import MRIImage from './components/MRIImage'
import { GetPatientsResponse } from './types/patient'

const GET_PATIENTS = gql`
  query GetPatients {
    patients {
      id
      firstName
      lastName
      age
      dateOfBirth
      gender
      bloodType
      weight
      height
      contactInfo {
        email
        phone
        address {
          street
          city
          zipCode
        }
      }
      lastDiagnosis
      lastExamDate
      medicalHistory {
        date
        condition
        treatment
        notes
      }
      allergies
      medications {
        name
        dosage
        frequency
        startDate
      }
      brainMRI {
        id
        date
        radiologist
        equipmentInfo
        slices {
          id
          imageUrl
          position
          description
          findings
          sequence
          sliceThickness
        }
        conclusion
      }
    }
  }
`

export default function HomePage() {
  const [result] = useQuery<GetPatientsResponse>({
    query: GET_PATIENTS,
  })

  const { data, fetching, error } = result

  if (fetching) {
    return <p className="text-center text-green-600">Loading...</p>
  }

  if (error) {
    console.error('Error fetching patients:', error)
    return <p className="text-center text-red-500">Failed to load data</p>
  }

  if (!data || !data.patients.length) {
    return <p className="text-center text-gray-500">No data available</p>
  }

  const patient = data.patients[0]

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Levý sloupec - Informace o pacientovi */}
        <div>
          <h2 className="text-xl font-bold mb-4">Patient Information</h2>
          <PatientCard
            firstName={patient.firstName}
            lastName={patient.lastName}
            age={patient.age}
            dateOfBirth={patient.dateOfBirth}
            gender={patient.gender}
            bloodType={patient.bloodType}
            weight={patient.weight}
            height={patient.height}
            contactInfo={patient.contactInfo}
            lastDiagnosis={patient.lastDiagnosis}
            lastExamDate={patient.lastExamDate}
            medicalHistory={patient.medicalHistory}
            allergies={patient.allergies}
            medications={patient.medications}
          />
        </div>

        {/* Pravý sloupec - MRI snímky */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">MRI Images</h2>
          <div className="flex flex-col gap-4">
            {patient.brainMRI.slices.map((slice) => (
              <MRIImage
                key={slice.id}
                imageUrl={slice.imageUrl}
                description={slice.description}
                position={slice.position}
                findings={slice.findings}
                sequence={slice.sequence}
                sliceThickness={slice.sliceThickness}
              />
            ))}
          </div>
          <div className="mt-4"></div>
        </div>
      </div>
    </div>
  )
}
