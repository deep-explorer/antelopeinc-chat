// import 'react-magic-slider-dots/dist/magic-dots.css'
// import Slider from 'react-slick'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
// import MagicSliderDots from 'react-magic-slider-dots'

// interface CarouselProps {
//   slidesToShow?: number
//   onChange?: (index: number) => void
//   children: React.ReactNode | React.ReactNode[]
// }

// export const Carousel = ({
//   slidesToShow,
//   onChange,
//   children
// }: CarouselProps) => {
//   const settings = {
//     arrows: true,
//     // className: 'slider variable-width',
//     dots: true,
//     infinite: false,
//     // centerMode: true,
//     slidesToShow: slidesToShow ?? 1,
//     slidesToScroll: 1,
//     // variableWidth: true,
//     // beforeChange: onChange
//     //   ? (oldIndex: number, newIndex: number) => onChange(newIndex)
//     //   : undefined,
//     beforeChange: (oldIndex: number, newIndex: number) => {
//       console.log('beforeChange', oldIndex, newIndex)
//     },
//     appendDots: (dots: any) => {
//       console.log({ dots })
//       return <MagicSliderDots dots={dots} numDotsToShow={7} dotWidth={20} />
//     }
//   }

//   return (
//     <div className="pb-6">
//       <Slider {...settings}>{children}</Slider>
//     </div>
//   )
// }
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
