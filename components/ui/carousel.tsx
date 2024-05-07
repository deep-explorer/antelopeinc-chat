import { useMemo } from 'react'
import BasicCarousel from 'react-multi-carousel'

interface CarouselProps {
  children: React.ReactNode | React.ReactNode[]
  itemCountOnMobile: number
  itemCountOnTablet?: number
  itemCountOnDesktop: number
}

export const Carousel = ({
  children,
  itemCountOnMobile,
  itemCountOnTablet,
  itemCountOnDesktop
}: CarouselProps) => {
  return (
    <BasicCarousel
      additionalTransfrom={0}
      arrows={true}
      centerMode={false}
      // customButtonGroup={<ButtonGroup />}
      className=""
      containerClass="container"
      dotListClass=""
      draggable={false}
      focusOnSelect={false}
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      partialVisible
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={true}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: itemCountOnDesktop,
          partialVisibilityGutter: 0
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: itemCountOnMobile,
          partialVisibilityGutter: 0
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items:
            itemCountOnTablet ??
            Math.floor((itemCountOnDesktop + itemCountOnMobile) / 2),
          partialVisibilityGutter: 30
        }
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={true}
      sliderClass=""
      slidesToSlide={1}
      ssr
      swipeable
    >
      {children}
    </BasicCarousel>
  )
}

const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
  const {
    carouselState: { currentSlide }
  } = rest

  console.log({ next, previous, goToSlide, rest })
  return (
    <div className="absolute">
      <button
        className={currentSlide === 0 ? 'disable' : ''}
        onClick={() => previous()}
      />
      <button onClick={() => next()} />
      <button onClick={() => goToSlide(currentSlide + 1)}>
        Go to any slide
      </button>
      {/* <Pagination
        currentPage={9}
        numberOfPages={50}
        onPageClick={page => console.log(page)}
      /> */}
    </div>
  )
}

export interface PaginationProps {
  numberOfPages: number
  currentPage: number
  onPageClick: (page: number) => void
}

const range = (start: number, end: number) => {
  let length = end - start + 1
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start)
}

const DOTS = '...'

export const usePagination = (
  numberOfpages: number,
  siblingCount = 1,
  currentPage: number
) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = numberOfpages

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    )

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 3
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      )
      return [firstPageIndex, DOTS, ...rightRange]
    }

    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [numberOfpages, siblingCount, currentPage])

  return paginationRange
}

export function Pagination(props: PaginationProps) {
  const pageRange = usePagination(props.numberOfPages, 1, props.currentPage)
  return (
    <div className="flex">
      <div
        className="flex px-2 py-1"
        // active={props.currentPage > 1}
        onClick={
          props.currentPage > 1
            ? () => props.onPageClick(props.currentPage - 1)
            : () => {}
        }
      >
        <BackArrow active={props.currentPage > 1} />
      </div>
      <div className="relative flex px-1">
        <div className="absolute top-1 ml-[-4px] mr-[-4px] w-full h-6 bg-[#e9eaf6] rounded-lg" />
        {pageRange &&
          pageRange.map((page, index) => (
            <div
              className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer hover:bg-[#e9eaf6] hover:text-[#3f4051] bg-green-500 z-10"
              // active={page === props.currentPage}
              key={index}
              onClick={
                page != DOTS
                  ? () => props.onPageClick(Number(page))
                  : () => undefined
              }
            >
              {page}
            </div>
          ))}
      </div>
      <div
        className="flex px-2 py-1"
        // active={props.currentPage < props.numberOfPages}
        onClick={
          props.currentPage < props.numberOfPages
            ? () => props.onPageClick(props.currentPage + 1)
            : () => {}
        }
      >
        <NextArrow active={props.currentPage < props.numberOfPages} />
      </div>
    </div>
  )
}

// const PagesContainer = styled.div`
//   position: relative;
//   display: flex;
//   padding: 0 3px;
// `

// // font-size: ${props => (props.active ? '14px' : '12px')};
// // font-weight: ${props => (props.active ? '500' : '300')};
// // color: ${props => (props.active ? '#3f4051' : '#9799b0')};
// // ${props => (props.active ? 'background-color: #fff;' : '')}

// const ArrowLink = styled.a<{ active: boolean }>`
//   display: flex;
//   padding: 4px 10px 0 10px;
//   & > svg {
//     width: 7px;
//   }
// `
// // cursor: ${props => (props.active ? 'pointer' : 'not-allowed')};

const BackArrow = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.6 10.5429C6.94286 10.8857 6.94286 11.4 6.6 11.7429C6.42857 11.9143 6.25714 12 6 12C5.74286 12 5.57143 11.9143 5.4 11.7429L0.257143 6.6C-0.0857143 6.25714 -0.0857143 5.74286 0.257143 5.4L5.4 0.257143C5.74286 -0.0857143 6.25714 -0.0857143 6.6 0.257143C6.94286 0.6 6.94286 1.11429 6.6 1.45714L2.05714 6L6.6 10.5429Z"
      fill={active ? '#3F4051' : '#9799B0'}
    />
  </svg>
)

const NextArrow = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.6 6.6L1.45714 11.7429C1.28571 11.9143 1.11429 12 0.857143 12C0.6 12 0.428571 11.9143 0.257143 11.7429C-0.0857143 11.4 -0.0857143 10.8857 0.257143 10.5429L4.8 6L0.257143 1.45714C-0.0857143 1.11429 -0.0857143 0.6 0.257143 0.257143C0.6 -0.0857143 1.11429 -0.0857143 1.45714 0.257143L6.6 5.4C6.94286 5.74286 6.94286 6.25714 6.6 6.6Z"
      fill={active ? '#3F4051' : '#9799B0'}
    />
  </svg>
)
