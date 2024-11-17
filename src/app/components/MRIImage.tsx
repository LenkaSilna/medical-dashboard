import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Image from 'next/image'

interface MRIImageProps {
  imageUrl: string
  description: string
  position: string
  findings: string
  sequence: string
  sliceThickness: string
}

const MRIImage: React.FC<MRIImageProps> = ({
  imageUrl,
  description,
  position,
  findings,
  sequence,
  sliceThickness,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleAccordion = () => setIsOpen(!isOpen)

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border">
      <div className="relative aspect-square mb-4">
        <Image
          src={imageUrl}
          alt={description}
          fill
          className="rounded-lg object-cover"
        />
      </div>

      <div className="space-y-2">
        <div className="mt-4">
          <button
            onClick={toggleAccordion}
            className="flex items-center space-x-2 w-full text-left text-sm font-medium text-black focus:outline-none"
          >
            <span>
              {isOpen ? 'Hide Image Description' : 'Show Image Description'}
            </span>
            {isOpen ? (
              <FaChevronUp className="text-black" />
            ) : (
              <FaChevronDown className="text-black" />
            )}
          </button>

          {isOpen && (
            <div className="py-2">
              <div className="flex justify-between text-sm">
                <span className="font-bold">Position:</span>{' '}
                <span className="text-gray-600">{position}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold">Sequence:</span>{' '}
                <span className="text-gray-600">{sequence}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold">Thickness:</span>{' '}
                <span className="text-gray-600">{sliceThickness}</span>
              </div>
              <div className="mt-2 space-y-2">
                <div className="text-sm">
                  <span className="font-bold">Description:</span>{' '}
                  <p className="text-gray-800 mt-1">{description}</p>
                </div>
                <div className="text-sm">
                  <span className="font-bold">Findings:</span>{' '}
                  <p className="text-gray-800 mt-1">{findings}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MRIImage
