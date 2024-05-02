import Image from 'next/image'
import { RoundSpinner } from '../stocks/ChatSpinner'

export function Loading() {
  return (
    <div className="flex gap-4 relative">
      <Image
        src="/vitamin/logos/renzo.png"
        height={100}
        width={100}
        alt="renzo-loading"
        style={{
          height: 92,
          width: 92,
          marginTop: 4,
          marginLeft: 4,
          zIndex: 10
        }}
      />
      <div>
        <h1 className="text-lg md:text-3xl font-semibold mb-4">
          Starting Your Analysis
        </h1>
        <p>
          To begin, we'll gather data on Renzo&apos;s and its key competitors,
          such as Flintstones and SmartyPants, focusing on customer feedback and
          social content to gather deep competitive intelligence. Please give me
          a moment.
        </p>
      </div>
      <RoundSpinner className="absolute top-0 left-0 fill-[#E76F51] w-[100px] h-[100px]" />
    </div>
  )
}
