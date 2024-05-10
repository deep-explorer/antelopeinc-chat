declare module 'react-magic-slider-dots' {
  import React, { ReactElement } from 'react'

  // Define the type for the props
  interface SliderDotsProps {
    dots: ReactElement[]
    numDotsToShow: number
    dotWidth: number
    dotContainerClassName?: string
    activeDotClassName?: string
    prevNextDotClassName?: string
  }

  // Define the component
  export const SliderDots: React.FC<SliderDotsProps>

  // Export default
  const MagicSliderDots: React.FC<SliderDotsProps>
  export default MagicSliderDots
}

declare module 'react-slick' {
  const Slider: React.FC<any>
  export default Slider
}
