'use client'
import React from 'react'

interface LoadingProps {
  className?: string
}

const Loading: React.FC<LoadingProps> = ({ className = '' }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="absolute w-2.5 h-2.5 bg-gray-600 rounded-full transform-gpu"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${index * 45}deg) translate(0, -150%)`,
                opacity: 1 - index * 0.1,
                animation: `loadingFade 1.2s ${index * 0.15}s linear infinite`,
              }}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes loadingFade {
          0% {
            opacity: 0.9;
          }
          100% {
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  )
}

export default Loading
