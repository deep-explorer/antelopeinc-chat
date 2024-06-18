import Image from 'next/image'
import { RoundSpinner } from '../stocks/ChatSpinner'
import { useWindowSize } from 'usehooks-ts'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getMetaDataOnClient } from '@/lib/utils'

interface LoadingProps {
  loadingTime: number
}

export function Loading({ loadingTime }: LoadingProps) {
  const { width: windowWidth } = useWindowSize()
  const params = useParams()
  const [isLoading, setLoading] = useState(true)
  const [continuationText, setContinuationText] = useState<string | null>(null)
  
  const { brand } = params

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, loadingTime)

    getMetaDataOnClient(brand).then(data => {
      setContinuationText(data?.continuationText)
    })
  }, [])

  return (
    <div className="relative">
      <div className="md:hidden flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <div>
            <img
              src="/vitamin/logos/renzos.png"
              height={windowWidth > 768 ? 92 : 56}
              width={windowWidth > 768 ? 92 : 56}
              alt="renzos-loading"
              style={{
                marginTop: 4,
                marginLeft: 4,
                zIndex: 10,
                position: 'relative'
              }}
            />
          </div>
          <h1 className="text-lg md:text-xl font-bold">
            {isLoading ? 'Starting Your Analysis' : 'Data is Ready'}
          </h1>
        </div>
        <p className="text-sm md:text-base">{continuationText}</p>
      </div>
      <div className="hidden md:flex gap-4">
        <img
          src="/vitamin/logos/renzos.png"
          alt="renzos-loading"
          style={{
            marginTop: 4,
            marginLeft: 4,
            zIndex: 10,
            position: 'relative',
            height: windowWidth > 768 ? 92 : 56,
            width: windowWidth > 768 ? 92 : 56
          }}
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-lg md:text-xl font-bold">
            {isLoading ? 'Starting Your Analysis' : 'Data is Ready'}
          </h1>
          <p className="text-sm md:text-base">{continuationText}</p>
        </div>
      </div>
      {isLoading ? (
        <RoundSpinner
          className={`absolute top-0 left-0 fill-[#E76F51] `}
          style={{
            width: windowWidth > 768 ? 100 : 64,
            height: windowWidth > 768 ? 100 : 64
          }}
        />
      ) : (
        <div className="absolute top-0 left-0 bg-[#E76F51] rounded-full size-16 md:size-[100px]"></div>
      )}
    </div>
  )
}
