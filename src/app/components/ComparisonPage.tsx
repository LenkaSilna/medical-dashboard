'use client'
import React, { useState } from 'react'
import ImageComparison from '@/app/components/ImageComparison'
import { FaArrowLeft } from 'react-icons/fa'

const initialImages = [
  '/images/mri-slice-1.jpg',
  '/images/mri-slice-2.jpg',
  '/images/mri-slice-3.jpg',
]

const ComparisonPage: React.FC = () => {
  const comparisonImages = initialImages
  const [leftImageIndex, setLeftImageIndex] = useState(0)
  const [rightImageIndex, setRightImageIndex] = useState(1)

  const handleLeftImageChange = (index: number) => {
    setLeftImageIndex(index)
  }

  const handleRightImageChange = (index: number) => {
    setRightImageIndex(index)
  }

  const handleBackClick = () => {
    window.history.back()
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center mb-4">
        <div className="mr-2 cursor-pointer" onClick={handleBackClick}>
          <FaArrowLeft className="text-gray-600" />
        </div>
        <h2 className="text-xl font-bold">Image Comparison</h2>
      </div>

      <ImageComparison
        images={comparisonImages}
        leftImageIndex={leftImageIndex}
        rightImageIndex={rightImageIndex}
        onLeftImageChange={handleLeftImageChange}
        onRightImageChange={handleRightImageChange}
      />
    </div>
  )
}

export default ComparisonPage
