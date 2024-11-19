'use client'
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PATIENT_IMAGES } from '@/app/queries'
import ImageComparison from '@/app/comparation/components/ImageComparison'
import { FaArrowLeft } from 'react-icons/fa'
import type { GetPatientsResponse } from '@/app/types/patient'
import { useRouter } from 'next/navigation'
import Loading from '@/app/shared/Loading'

const ComparisonPage: React.FC = () => {
  const [leftImageIndex, setLeftImageIndex] = useState(0)
  const [rightImageIndex, setRightImageIndex] = useState(1)
  const router = useRouter()

  const { loading, error, data } =
    useQuery<GetPatientsResponse>(GET_PATIENT_IMAGES)

  const handleLeftImageChange = (index: number) => {
    setLeftImageIndex(index)
  }

  const handleRightImageChange = (index: number) => {
    setRightImageIndex(index)
  }

  const handleBackClick = () => {
    router.back()
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error loading images: {error.message}
      </p>
    )
  }

  if (!data || !data.patients[0]?.brainMRI?.slices) {
    return <p className="text-center text-gray-500">No images available</p>
  }

  const { slices } = data.patients[0].brainMRI
  const getBaseUrl = () =>
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:3000')

  const comparisonImages = slices.map((slice) => {
    return slice.imageUrl.startsWith('/')
      ? `${getBaseUrl()}${slice.imageUrl}`
      : slice.imageUrl
  })

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <div className="mr-2 cursor-pointer" onClick={handleBackClick}>
          <FaArrowLeft className="text-gray-600" />
        </div>
        <h2 className="text-xl font-bold">Image Comparison</h2>
      </div>

      <ImageComparison
        images={comparisonImages}
        slicesInfo={slices}
        leftImageIndex={leftImageIndex}
        rightImageIndex={rightImageIndex}
        onLeftImageChange={handleLeftImageChange}
        onRightImageChange={handleRightImageChange}
      />
    </div>
  )
}

export default ComparisonPage
