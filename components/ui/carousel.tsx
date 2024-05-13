import 'react-magic-slider-dots/dist/magic-dots.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import MagicSliderDots from 'react-magic-slider-dots'

interface CarouselProps {
  onChange?: (index: number) => void
  children: React.ReactNode | React.ReactNode[]
}

export const Carousel = ({ onChange, children }: CarouselProps) => {
  const settings = {
    arrows: true,
    className: 'slider variable-width',
    dots: true,
    infinite: false,
    // centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    beforeChange: onChange
      ? (oldIndex: number, newIndex: number) => onChange(newIndex)
      : undefined,
    appendDots: (dots: any) => {
      return <MagicSliderDots dots={dots} numDotsToShow={7} dotWidth={20} />
    }
  }

  return (
    <div className="pb-6">
      <Slider {...settings}>{children}</Slider>
    </div>
  )
}
