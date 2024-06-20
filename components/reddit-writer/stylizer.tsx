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
import {
  channelList,
  writingStyleList,
  lengthList,
  audienceList
} from '@/lib/constants/systemPrompt'
export default function Stylizer({
  onStyle
}: {
  onStyle: (style: string) => void
}) {
  
  const { width: windowWidth } = useWindowSize()
  const [_, setMessages] = useUIState<typeof AI>()

  const [channel, setChannel] = useState<any>(channelList[0].name)
  const [length, setLength] = useState<any>(lengthList[0].name)
  const [writingStyle, setWritingStyle] = useState<any>(
    writingStyleList[0].name
  )
  const [audience, setAudience] = useState<any>(audienceList[0].name)
  const handleSubmit = () => {
    let styler = `
    ------------------------Style guide of your reply you have to prepare -----------------------------\n
Please write this outline into a compelling post with the below style.\n`
    const styles = [channel, length, writingStyle, audience]
    channelList.find(e => e.name === channel)
    styler += `Post is for ${channel} channel, Tone, style, something you have to focus and audience of this post is like belows:
           ${channelList.find(e => e.name === channel)?.style}
    `

    styler += `Post length has to be ${length} , style and usage for this post is like belows:
        ${lengthList.find(e => e.name === length)?.style}
    `

    styler += `Writing style is for ${writingStyle} , details of it are like belows:
            ${writingStyleList.find((e: any) => e.name === writingStyle)?.style}
    `
    styler += `Post is for ${audience} , details of it are like belows:
            ${audienceList.find((e: any) => e.name === audience)?.style}`
    styler += `
    ---------------------------------------End of style guide-----------------------------------\n`

    onStyle(styler)
  }
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm md:text-base font-semibold">
        Thank you for your answers, to compile this into a compelling piece of
        content, please can you tell me how you&apos;d like your post built.
      </p>

      <div className="flex flex-wrap mb-2 md:mb-4 ">
        <div className="flex flex-col items-start w-full md:w-1/2 mr-0 mb-2 md:mb-8">
          <strong className="mb-1">Channel</strong>
          <div className="pr-0 md:pr-2 w-full ">
            <div className="border-[1px] border-white w-full rounded-md">
              <Select
                onValueChange={value => setChannel(value)}
                defaultValue={channelList[0].name}
              >
                <SelectTrigger aria-label="Food">
                  <SelectValue placeholder="Select a channel..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {channelList.map((channel, i) => {
                      return (
                        <SelectItem key={i} value={channel.name}>
                          {channel.name}
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
              <Select
                onValueChange={value => setLength(value)}
                defaultValue={lengthList[0].name}
              >
                <SelectTrigger aria-label="Food">
                  <SelectValue placeholder="Select a length..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {lengthList.map((len, i) => {
                      return (
                        <SelectItem key={i} value={len.name}>
                          {len.name}
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start w-full md:w-1/2  ">
          <strong className="mb-1">Writing Style</strong>
          <div className="pr-0 md:pr-2 w-full ">
            <div className="border-[1px] border-white w-full rounded-md">
              <Select
                onValueChange={value => setWritingStyle(value)}
                defaultValue={writingStyleList[0].name}
              >
                <SelectTrigger aria-label="Food">
                  <SelectValue placeholder="Select a writing style..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {writingStyleList.map((writingStyle, i) => {
                      return (
                        <SelectItem key={i} value={writingStyle.name}>
                          {writingStyle.name}
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start w-full md:w-1/2 mr-0">
          <strong className="mb-1">Audience</strong>
          <div className="pr-0 md:pr-2 w-full ">
            <div className="border-[1px] border-white w-full rounded-md">
              <Select
                onValueChange={value => setAudience(value)}
                defaultValue={audienceList[0].name}
              >
                <SelectTrigger aria-label="Food">
                  <SelectValue placeholder="Select a writing style..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {audienceList.map((audience, i) => {
                      return (
                        <SelectItem key={i} value={audience.name}>
                          {audience.name}
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
