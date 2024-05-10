import Image from 'next/image'
import { RoundSpinner } from '../stocks/ChatSpinner'
import { useWindowSize } from 'usehooks-ts'

export function Loading() {
  const { width: windowWidth } = useWindowSize()

  return (
    <div className="relative">
      <div className="md:hidden flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <div>
            <Image
              src="/vitamin/logos/renzo.png"
              height={windowWidth > 768 ? 92 : 56}
              width={windowWidth > 768 ? 92 : 56}
              alt="renzo-loading"
              style={{
                marginTop: 4,
                marginLeft: 4,
                zIndex: 10,
                position: 'relative'
              }}
            />
          </div>
          <h1 className="text-lg md:text-xl font-bold">
            Starting Your Analysis
          </h1>
        </div>
        <p className="text-sm md:text-base">
          To begin, we&apos;ll gather data on Renzo&apos;s and its key
          competitors, such as Flintstones and SmartyPants, focusing on customer
          feedback and social content to gather deep competitive intelligence.
          Please give me a moment.
        </p>
      </div>
      <div className="hidden md:flex gap-4">
        <img
          src="/vitamin/logos/renzo.png"
          alt="renzo-loading"
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
            Starting Your Analysis
          </h1>
          <p className="text-sm md:text-base">
            To begin, we&apos;ll gather data on Renzo&apos;s and its key
            competitors, such as Flintstones and SmartyPants, focusing on
            customer feedback and social content to gather deep competitive
            intelligence. Please give me a moment.
          </p>
        </div>
      </div>
      <RoundSpinner
        className={`absolute top-0 left-0 fill-[#E76F51] `}
        style={{
          width: windowWidth > 768 ? 100 : 64,
          height: windowWidth > 768 ? 100 : 64
        }}
      />
    </div>
  )
}
