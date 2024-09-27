import { Children, ReactNode } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import './styles.css'
import { Pagination, Navigation } from 'swiper/modules'
import { useWindowSize } from 'usehooks-ts'

interface CarouselProps {
  onChange?: (progress: number) => void //  progress: 0-1
  children: ReactNode
}

export const Carousel = ({ onChange, children }: CarouselProps) => {
  const { width: windowWidth } = useWindowSize()

  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={windowWidth > 768 ? 12 : 8}
      grabCursor={true}
      pagination={{
        dynamicBullets: true,
        clickable: true
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
      onTransitionEnd={swiper => {
        onChange && onChange(swiper.progress)
      }}
    >
      {Children.toArray(children).map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  )
}
