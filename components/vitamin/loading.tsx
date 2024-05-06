import Image from 'next/image'
import { RoundSpinner } from '../stocks/ChatSpinner'
import { useWindowSize } from 'usehooks-ts'

export function Loading() {
  const { width: windowWidth } = useWindowSize()

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4 relative">
      <Image
        src="/vitamin/logos/renzo.png"
        height={windowWidth > 768 ? 100 : 64}
        width={windowWidth > 768 ? 100 : 64}
        alt="renzo-loading"
        style={{
          height: windowWidth > 768 ? 92 : 56,
          width: windowWidth > 768 ? 92 : 56,
          marginTop: 4,
          marginLeft: 4,
          zIndex: 10
        }}
      />
      <div>
        <h1 className="text-lg md:text-3xl font-semibold mb-4">
          Starting Your Analysis
        </h1>
        <p className="text-[10px] md:text-sm">
          To begin, we&apos;ll gather data on Renzo&apos;s and its key
          competitors, such as Flintstones and SmartyPants, focusing on customer
          feedback and social content to gather deep competitive intelligence.
          Please give me a moment.
        </p>
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
