'use client'
import React, { useState } from 'react'
import {
  FaSearchPlus,
  FaSearchMinus,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa'
import Image from 'next/image'
import { MRISlice } from '@/app/types/patient'

type ImageComparisonProps = {
  images: string[]
  slicesInfo: MRISlice[]
  leftImageIndex: number
  rightImageIndex: number
  onLeftImageChange: (index: number) => void
  onRightImageChange: (index: number) => void
}

const ImageComparison: React.FC<ImageComparisonProps> = ({
  images,
  slicesInfo,
  leftImageIndex,
  rightImageIndex,
  onLeftImageChange,
  onRightImageChange,
}) => {
  const [zoomLevelLeft, setZoomLevelLeft] = useState(1)
  const [zoomLevelRight, setZoomLevelRight] = useState(1)
  const [showLeftInfo, setShowLeftInfo] = useState(false)
  const [showRightInfo, setShowRightInfo] = useState(false)

  const zoomInLeft = () => setZoomLevelLeft((prev) => prev * 1.2)
  const zoomInRight = () => setZoomLevelRight((prev) => prev * 1.2)

  const zoomOutLeft = () => {
    if (zoomLevelLeft > 1) {
      setZoomLevelLeft((prev) => prev / 1.2)
    }
  }

  const zoomOutRight = () => {
    if (zoomLevelRight > 1) {
      setZoomLevelRight((prev) => prev / 1.2)
    }
  }

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
      <div className="flex flex-col align-middle md:flex-row justify-center md:justify-between mb-4 gap-2">
        <div className="flex md:flex-row justify-center gap-0.5 items-center">
          <label className="mr-2 text-sm">Left Image</label>
          <select
            value={leftImageIndex}
            onChange={(e) => {
              onLeftImageChange(Number(e.target.value))
              resetZoomOnChange('left')
            }}
            className="p-2 border rounded text-sm"
          >
            {images.map((image, index) => (
              <option key={index} value={index}>
                Image {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="flex md:flex-row justify-center gap-0.5 items-center">
          <label className="mr-2 text-sm">Right Image</label>
          <select
            value={rightImageIndex}
            onChange={(e) => {
              onRightImageChange(Number(e.target.value))
              resetZoomOnChange('right')
            }}
            className="p-2 border rounded text-sm"
          >
            {images.map((image, index) => (
              <option key={index} value={index}>
                Image {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="flex-1">
          <div
            className="relative overflow-auto mb-4"
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

          <div className="bg-white rounded-lg shadow">
            <div
              onClick={() => setShowLeftInfo(!showLeftInfo)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <h3 className="text-lg font-semibold">Additional Data</h3>
              {showLeftInfo ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {showLeftInfo && (
              <div className="p-4 border-t">
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-bold">Position:</span>{' '}
                    {slicesInfo[leftImageIndex].position}
                  </p>
                  <p>
                    <span className="font-bold">Sequence:</span>{' '}
                    {slicesInfo[leftImageIndex].sequence}
                  </p>
                  <p>
                    <span className="font-bold">Thickness:</span>{' '}
                    {slicesInfo[leftImageIndex].sliceThickness}
                  </p>
                  <p>
                    <span className="font-bold">Description:</span>{' '}
                    {slicesInfo[leftImageIndex].description}
                  </p>
                  <p>
                    <span className="font-bold">Findings:</span>{' '}
                    {slicesInfo[leftImageIndex].findings}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div
            className="relative overflow-auto mb-4"
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

          <div className="bg-white rounded-lg shadow">
            <div
              onClick={() => setShowRightInfo(!showRightInfo)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <h3 className="text-lg font-semibold">Additional Data</h3>
              {showRightInfo ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {showRightInfo && (
              <div className="p-4 border-t">
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-bold">Position:</span>{' '}
                    {slicesInfo[rightImageIndex].position}
                  </p>
                  <p>
                    <span className="font-bold">Sequence:</span>{' '}
                    {slicesInfo[rightImageIndex].sequence}
                  </p>
                  <p>
                    <span className="font-bold">Thickness:</span>{' '}
                    {slicesInfo[rightImageIndex].sliceThickness}
                  </p>
                  <p>
                    <span className="font-bold">Description:</span>{' '}
                    {slicesInfo[rightImageIndex].description}
                  </p>
                  <p>
                    <span className="font-bold">Findings:</span>{' '}
                    {slicesInfo[rightImageIndex].findings}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageComparison
