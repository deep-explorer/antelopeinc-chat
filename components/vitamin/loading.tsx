import { RoundSpinner } from '../stocks/ChatSpinner'
import { useWindowSize } from 'usehooks-ts'
import { useEffect, useState } from 'react'

interface LoadingProps {
  logo: string
  continuationText: string
  loadingTime: number
}

export function Loading({ logo, continuationText, loadingTime }: LoadingProps) {
  const { width: windowWidth } = useWindowSize()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, loadingTime)
  }, [])

  return (
    <div className="relative">
      <div className="md:hidden flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <div>
            <img
              src={logo}
              height={windowWidth > 768 ? 92 : 56}
              width={windowWidth > 768 ? 92 : 56}
              alt="logo"
              style={{
                marginTop: 4,
                marginLeft: 4,
                zIndex: 10,
                position: 'relative'
              }}
              className="rounded-full"
            />
          </div>
          <h1 className="text-lg font-bold">
            {isLoading ? 'Starting Your Analysis' : 'Data is Ready'}
          </h1>
        </div>
        <p className="text-sm md:text-base">{continuationText}</p>
      </div>
      <div className="hidden md:flex gap-4">
        <img
          src={logo}
          alt="logo"
          style={{
            marginTop: 4,
            marginLeft: 4,
            zIndex: 10,
            position: 'relative',
            height: windowWidth > 768 ? 92 : 56,
            width: windowWidth > 768 ? 92 : 56
          }}
          className="rounded-full"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">
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
