import { useWindowSize } from 'usehooks-ts'
import { Carousel } from '../../ui/carousel'
import Image from 'next/image'

interface LogoCarouselProps {
  logos: string[]
}

export function LogoCarousel({ logos }: LogoCarouselProps) {
  const { width: windowWidth } = useWindowSize()

  return (
    <Carousel>
      <div>
        <Image
          src="/vitamin/logos/renzos.png"
          height={windowWidth > 768 ? 104 : 48}
          width={windowWidth > 768 ? 104 : 48}
          className="rounded-full"
          alt="renzos-logo"
        />
      </div>
      <div className="rounded-full max-w-6 md:max-w-8 size-6 md:size-8 p-1 md:p-2 mt-3 md:mt-8 bg-[#2F616A] text-[6px] md:text-base">
        <p className="text-xs">vs</p>
      </div>
      {logos.map((logo, index) => (
        <div key={index}>
          <Image
            src={logo}
            height={windowWidth > 768 ? 104 : 48}
            width={windowWidth > 768 ? 104 : 48}
            className="rounded-full"
            alt={logo}
          />
        </div>
      ))}
    </Carousel>
  )
}
