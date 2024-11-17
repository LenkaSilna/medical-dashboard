import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { gql } from 'graphql-tag'
import patientData from '@/app/data/patient-data.json'

const typeDefs = gql`
  type Address {
    street: String!
    city: String!
    zipCode: String!
  }

  type ContactInfo {
    email: String!
    phone: String!
    address: Address!
  }

  type Medication {
    name: String!
    dosage: String!
    frequency: String!
    startDate: String!
  }

  type MedicalHistory {
    date: String!
    condition: String!
    treatment: String!
    notes: String!
  }

  type MRISlice {
    id: ID!
    imageUrl: String!
    description: String!
    position: String!
    findings: String
    sequence: String
    sliceThickness: String
  }

  type MRIStudy {
    id: ID!
    date: String!
    radiologist: String
    equipmentInfo: String
    slices: [MRISlice!]!
    conclusion: String
  }

  type Patient {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    dateOfBirth: String!
    gender: String!
    bloodType: String!
    weight: Int!
    height: Int!
    contactInfo: ContactInfo!
    lastDiagnosis: String!
    lastExamDate: String!
    medicalHistory: [MedicalHistory!]!
    allergies: [String!]!
    medications: [Medication!]!
    brainMRI: MRIStudy!
  }

  type Query {
    patients: [Patient!]!
  }
`

const resolvers = {
  Query: {
    patients: () => {
      console.log('Returning patients:', patientData.patients)
      return patientData.patients
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler(server)

export { handler as GET, handler as POST }
