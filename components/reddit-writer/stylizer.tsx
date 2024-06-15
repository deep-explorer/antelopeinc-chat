'use client'

import { BotCard } from '../stocks/message'
import { useActions, useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import * as Form from '@radix-ui/react-form'
// import * as Select from '@radix-ui/react-select'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectValue
} from '../ui/select'
import { Button } from '@radix-ui/themes'
import { useWindowSize } from 'usehooks-ts'
import { nanoid } from 'nanoid'
import { useState, forwardRef, RefObject, ReactNode, useRef } from 'react'

const channelList= ['Channel1', 'Channel2', 'Channel3']
const lengthList = ['Short', 'Medium', 'Long']
const writingStyleList = ['English Level A', 'English Level B', 'English Level C']
export default function Stylizer({
  onStyle
}: {
  onStyle: (style: object[]) => void
}) {
  const { width: windowWidth } = useWindowSize()
  const [_, setMessages] = useUIState<typeof AI>()

  const [channel, setChannel] = useState<string>(channelList[0])
  const [length, setLength] = useState<string>(lengthList[0])
  const [writingStyle, setWritingStyle] = useState<string>(writingStyleList[0])

  const handleSubmit = () => {
    console.log('ssssdf')
    onStyle([{channel}, {length}, {writingStyle}])
  }
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm md:text-base font-semibold">
        Thank you for your answers, to compile this into a compelling piece of
        content, please can you tell me how you'd like your post built.
      </p>

      <div className="flex flex-wrap mb-4 md:mb-8 ">
        <div className="flex flex-col items-start w-full md:w-1/2 mr-0 mb-2 md:mb-8">
          <strong className="mb-1">Channel</strong>
          <div className="pr-0 md:pr-2 w-full ">
            <div className="border-[1px] border-white w-full rounded-md">
              <Select onValueChange={value => setChannel(value)} defaultValue={channelList[0]}>
                <SelectTrigger aria-label="Food">
                  <SelectValue placeholder="Select a channel..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {channelList.map((channel, i) => {
                      return (
                        <SelectItem key={i} value={channel}>
                          {channel}
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start w-full md:w-1/2 mr-0 mb-2 md:mb-8 ">
          <strong className="mb-1">Length</strong>
          <div className="pr-0 md:pr-2 w-full ">
            <div className="border-[1px] border-white w-full rounded-md">
              <Select onValueChange={value => setLength(value)} defaultValue={lengthList[0]}>
                <SelectTrigger aria-label="Food">
                  <SelectValue placeholder="Select a length..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {['Short', 'Medium', 'Long'].map((length, i) => {
                      return (
                        <SelectItem key={i} value={length}>
                          {length}
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start w-full md:w-1/2 mr-0 ">
          <strong className="mb-1">Writing Style</strong>
          <div className="pr-0 md:pr-2 w-full ">
            <div className="border-[1px] border-white w-full rounded-md">
              <Select onValueChange={value => setWritingStyle(value)} defaultValue={writingStyleList[0]}>
                <SelectTrigger aria-label="Food">
                  <SelectValue placeholder="Select a writing style..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {['English Level A', 'English Level B', 'English Level C'].map((writingStyle, i) => {
                      return (
                        <SelectItem key={i} value={writingStyle}>
                          {writingStyle}
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <Button
        style={{
          width: '100%',
          backgroundColor: '#E54D2E',
          cursor: 'pointer'
        }}
        size={windowWidth > 768 ? '3' : '2'}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  )
}
type SelectItemProps = {
  children: React.ReactNode
  className?: string
  value: string // Add value to the type
}
// const SelectItem = forwardRef((props: SelectItemProps, ref: React.Ref<any>) => {
//   const { children, className, value, ...rest } = props

//   return (
//     <Select.Item
//       {...rest}
//       value={value}
//       className ='SelectItem'
//       ref={ref}
//     >
//       <Select.ItemText>{children}</Select.ItemText>
//       <Select.ItemIndicator className="SelectItemIndicator">
//         {/* <CheckIcon /> */}
//       </Select.ItemIndicator>
//     </Select.Item>
//   )
// })

// SelectItem.displayName = 'SelectItem'
