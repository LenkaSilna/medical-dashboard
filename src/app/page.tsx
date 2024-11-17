'use client'

import { useState } from 'react'
import { useQuery } from 'urql'
import { gql } from 'graphql-tag'
import PatientCard from './components/PatientCard'
import MRIImage from './components/MRIImage'
import { GetPatientsResponse } from './types/patient'
import Link from 'next/link'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  const handleNextImage = () => {
    if (currentImageIndex < patient.brainMRI.slices.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

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
        {/* Left column - patient info */}
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

        {/* Right column - MRI images */}
        <div className="space-y-4">
          <div className="flex align-middle justify-between">
            <h2 className="text-xl font-bold">MRI Images</h2>
            <Link href="/comparation">
              <button className="p-1 border text-xs rounded-md">
                Compare
              </button>
            </Link>
          </div>
          <div className="flex flex-col">
            <MRIImage
              key={patient.brainMRI.slices[currentImageIndex].id}
              imageUrl={patient.brainMRI.slices[currentImageIndex].imageUrl}
              description={
                patient.brainMRI.slices[currentImageIndex].description
              }
              position={patient.brainMRI.slices[currentImageIndex].position}
              findings={patient.brainMRI.slices[currentImageIndex].findings}
              sequence={patient.brainMRI.slices[currentImageIndex].sequence}
              sliceThickness={
                patient.brainMRI.slices[currentImageIndex].sliceThickness
              }
            />
          </div>
          <div className="mt-4 flex justify-between w-full max-w-sm">
            <button
              onClick={handlePrevImage}
              disabled={currentImageIndex === 0}
              className="p-2 bg-gray-600 text-white rounded-full disabled:opacity-30"
            >
              <FaArrowLeft size={20} />
            </button>

            <button
              onClick={handleNextImage}
              disabled={
                currentImageIndex === patient.brainMRI.slices.length - 1
              }
              className="p-2 bg-gray-600 text-white rounded-full disabled:opacity-30"
            >
              <FaArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
