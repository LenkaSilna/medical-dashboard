import { gql } from '@apollo/client'

export const GET_PATIENTS = gql`
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

export const GET_PATIENT_IMAGES = gql`
  query GetPatientImages {
    patients {
      id
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