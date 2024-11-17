'use client'
import React, { useState } from 'react'
import { FaSearchPlus, FaSearchMinus } from 'react-icons/fa'
import Image from 'next/image'

type ImageComparisonProps = {
  images: string[]
  leftImageIndex: number
  rightImageIndex: number
  onLeftImageChange: (index: number) => void
  onRightImageChange: (index: number) => void
}

const ImageComparison: React.FC<ImageComparisonProps> = ({
  images,
  leftImageIndex,
  rightImageIndex,
  onLeftImageChange,
  onRightImageChange,
}) => {
  const [zoomLevelLeft, setZoomLevelLeft] = useState(1)
  const [zoomLevelRight, setZoomLevelRight] = useState(1)

  // Zoom functions
  const zoomInLeft = () => setZoomLevelLeft((prev) => prev * 1.2)
  const zoomOutLeft = () => setZoomLevelLeft((prev) => prev / 1.2)

  const zoomInRight = () => setZoomLevelRight((prev) => prev * 1.2)
  const zoomOutRight = () => setZoomLevelRight((prev) => prev / 1.2)

  const handleWheel = (e: React.WheelEvent, side: 'left' | 'right') => {
    if (side === 'left') {
      if (e.deltaY < 0) zoomInLeft()
      else zoomOutLeft()
    } else {
      if (e.deltaY < 0) zoomInRight()
      else zoomOutRight()
    }
  }

  const resetZoomOnChange = (side: 'left' | 'right') => {
    if (side === 'left') {
      setZoomLevelLeft(1.2)
    } else {
      setZoomLevelRight(1.2)
    }
  }

  return (
    <div className="relative">
      {/* Image Selection Section */}
      <div className="flex flex-col align-middle md:flex-row justify-center md:justify-between mb-4 gap-2">
        {/* Left Image select */}
        <div className="flex md:flex-row justify-center gap-0.5 items-center">
          <label className="mr-2">Left Image</label>
          <select
            value={leftImageIndex}
            onChange={(e) => {
              onLeftImageChange(Number(e.target.value))
              resetZoomOnChange('left')
            }}
            className="p-2 border rounded"
          >
            {images.map((image, index) => (
              <option key={index} value={index}>
                Image {index + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Right Image select */}
        <div className="flex md:flex-row justify-center gap-0.5 items-center">
          <label className="mr-2">Right Image</label>
          <select
            value={rightImageIndex}
            onChange={(e) => {
              onRightImageChange(Number(e.target.value))
              resetZoomOnChange('right')
            }}
            className="p-2 border rounded"
          >
            {images.map((image, index) => (
              <option key={index} value={index}>
                Image {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Image Display Section */}
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Left Image */}
        <div
          className="relative overflow-auto"
          onWheel={(e) => handleWheel(e, 'left')}
          style={{
            width: '100%',
            height: '400px',
            cursor: 'zoom-in',
          }}
        >
          <Image
            src={images[leftImageIndex]}
            alt={`Left Image ${leftImageIndex + 1}`}
            width={600}
            height={400}
            style={{
              transform: `scale(${zoomLevelLeft})`,
              transition: 'transform 0.3s ease',
            }}
          />
          <div className="absolute bottom-4 left-4">
            <button
              onClick={zoomInLeft}
              className="p-2 bg-gray-700 text-white rounded-full m-2"
            >
              <FaSearchPlus size={16} />
            </button>
            <button
              onClick={zoomOutLeft}
              className="p-2 bg-gray-700 text-white rounded-full m-2"
            >
              <FaSearchMinus size={16} />
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div
          className="relative overflow-auto"
          onWheel={(e) => handleWheel(e, 'right')}
          style={{
            width: '100%',
            height: '400px',
            cursor: 'zoom-in',
          }}
        >
          <Image
            src={images[rightImageIndex]}
            alt={`Right Image ${rightImageIndex + 1}`}
            width={600}
            height={400}
            style={{
              transform: `scale(${zoomLevelRight})`,
              transition: 'transform 0.3s ease',
            }}
          />
          <div className="absolute bottom-4 left-4">
            <button
              onClick={zoomInRight}
              className="p-2 bg-gray-700 text-white rounded-full m-2"
            >
              <FaSearchPlus size={16} />
            </button>
            <button
              onClick={zoomOutRight}
              className="p-2 bg-gray-700 text-white rounded-full m-2"
            >
              <FaSearchMinus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageComparison
