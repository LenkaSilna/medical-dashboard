'use client'
import React, { useState, useEffect, useRef } from 'react'
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

type Point = {
  x: number
  y: number
}

const DEFAULT_POSITION: Point = { x: 0, y: 0 }

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
  const [offsetLeft, setOffsetLeft] = useState<Point>(DEFAULT_POSITION)
  const [offsetRight, setOffsetRight] = useState<Point>(DEFAULT_POSITION)
  const [showLeftInfo, setShowLeftInfo] = useState(false)
  const [showRightInfo, setShowRightInfo] = useState(false)

  const leftImageRef = useRef<HTMLDivElement>(null)
  const rightImageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const leftElement = leftImageRef.current
    const rightElement = rightImageRef.current

    if (!leftElement || !rightElement) return

    const preventScroll = (e: WheelEvent) => {
      e.preventDefault()
    }

    leftElement.addEventListener('wheel', preventScroll, { passive: false })
    rightElement.addEventListener('wheel', preventScroll, { passive: false })

    return () => {
      leftElement.removeEventListener('wheel', preventScroll)
      rightElement.removeEventListener('wheel', preventScroll)
    }
  }, [])

  const getRelativeMousePosition = (
    event: React.MouseEvent | React.WheelEvent,
    container: HTMLElement
  ): Point => {
    const rect = container.getBoundingClientRect()
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  const calculateZoomOffset = (
    container: HTMLElement,
    event: React.MouseEvent | React.WheelEvent,
    currentOffset: Point,
    currentZoom: number,
    newZoom: number
  ): Point => {
    if (newZoom === 1) {
      return DEFAULT_POSITION
    }

    const mouse = getRelativeMousePosition(event, container)

    return {
      x: mouse.x - (mouse.x - currentOffset.x) * (newZoom / currentZoom),
      y: mouse.y - (mouse.y - currentOffset.y) * (newZoom / currentZoom),
    }
  }

  const handleZoom = (
    side: 'left' | 'right',
    zoomIn: boolean,
    event: React.MouseEvent | React.WheelEvent
  ) => {
    const container =
      side === 'left' ? leftImageRef.current : rightImageRef.current
    if (!container) return

    const zoomFactor = zoomIn ? 1.2 : 1 / 1.2
    const minZoom = 1
    const maxZoom = 30

    if (side === 'left') {
      setZoomLevelLeft((prevZoom) => {
        const newZoom = Math.min(
          Math.max(prevZoom * zoomFactor, minZoom),
          maxZoom
        )
        if (newZoom !== prevZoom) {
          if (newZoom === 1) {
            setOffsetLeft(DEFAULT_POSITION)
          } else {
            setOffsetLeft(
              calculateZoomOffset(
                container,
                event,
                offsetLeft,
                prevZoom,
                newZoom
              )
            )
          }
        }
        return newZoom
      })
    } else {
      setZoomLevelRight((prevZoom) => {
        const newZoom = Math.min(
          Math.max(prevZoom * zoomFactor, minZoom),
          maxZoom
        )
        if (newZoom !== prevZoom) {
          if (newZoom === 1) {
            setOffsetRight(DEFAULT_POSITION)
          } else {
            setOffsetRight(
              calculateZoomOffset(
                container,
                event,
                offsetRight,
                prevZoom,
                newZoom
              )
            )
          }
        }
        return newZoom
      })
    }
  }

  const handleWheel = (e: React.WheelEvent, side: 'left' | 'right') => {
    handleZoom(side, e.deltaY < 0, e)
  }

  const resetZoom = (side: 'left' | 'right') => {
    if (side === 'left') {
      setZoomLevelLeft(1)
      setOffsetLeft(DEFAULT_POSITION)
    } else {
      setZoomLevelRight(1)
      setOffsetRight(DEFAULT_POSITION)
    }
  }

  const renderImage = (
    side: 'left' | 'right',
    zoomLevel: number,
    offset: Point,
    imageIndex: number,
    onImageChange: (index: number) => void,
    showInfo: boolean,
    setShowInfo: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const handleZoomIn = (e: React.MouseEvent) => handleZoom(side, true, e)
    const handleZoomOut = (e: React.MouseEvent) => handleZoom(side, false, e)

    return (
      <div className="flex-1 relative">
        <div className="flex justify-between items-center mb-2">
          <label className="mr-2 text-sm">
            {side === 'left' ? 'Left' : 'Right'} Image
          </label>
          <select
            value={imageIndex}
            onChange={(e) => {
              onImageChange(Number(e.target.value))
              resetZoom(side)
            }}
            className="p-2 border rounded text-sm"
          >
            {images.map((_, index) => (
              <option key={index} value={index}>
                Image {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div
          ref={side === 'left' ? leftImageRef : rightImageRef}
          className="overflow-hidden relative w-full h-[400px] cursor-zoom-in"
          onWheel={(e) => handleWheel(e, side)}
        >
          <div
            className="bg-[var(--foreground)] absolute inset-0 flex justify-center"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoomLevel})`,
              transformOrigin: '0 0',
              transition: 'transform 0.1s ease-out',
            }}
          >
            <Image
              src={images[imageIndex]}
              alt={`${side === 'left' ? 'Left' : 'Right'} Image ${imageIndex + 1}`}
              width={400}
              height={400}
              className="object-contain"
              draggable={false}
            />
          </div>
          <div className="absolute right-4">
            <button
              onClick={handleZoomIn}
              className="p-2 bg-gray-700 text-white rounded-full m-2"
            >
              <FaSearchPlus size={16} />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 bg-gray-700 text-white rounded-full m-2"
            >
              <FaSearchMinus size={16} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mt-4">
          <div
            onClick={() => setShowInfo(!showInfo)}
            className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
          >
            <h3 className="text-lg font-semibold">Additional Data</h3>
            {showInfo ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {showInfo && (
            <div className="p-4 border-t">
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-bold">Position:</span>{' '}
                  {slicesInfo[imageIndex].position}
                </p>
                <p>
                  <span className="font-bold">Sequence:</span>{' '}
                  {slicesInfo[imageIndex].sequence}
                </p>
                <p>
                  <span className="font-bold">Thickness:</span>{' '}
                  {slicesInfo[imageIndex].sliceThickness}
                </p>
                <p>
                  <span className="font-bold">Description:</span>{' '}
                  {slicesInfo[imageIndex].description}
                </p>
                <p>
                  <span className="font-bold">Findings:</span>{' '}
                  {slicesInfo[imageIndex].findings}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8">
      {renderImage(
        'left',
        zoomLevelLeft,
        offsetLeft,
        leftImageIndex,
        onLeftImageChange,
        showLeftInfo,
        setShowLeftInfo
      )}
      {renderImage(
        'right',
        zoomLevelRight,
        offsetRight,
        rightImageIndex,
        onRightImageChange,
        showRightInfo,
        setShowRightInfo
      )}
    </div>
  )
}

export default ImageComparison
