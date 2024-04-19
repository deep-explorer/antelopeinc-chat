'use client'

import { IconUser } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { ChatSpinner } from './ChatSpinner'
import { CodeBlock } from '../ui/codeblock'
import { MemoizedReactMarkdown } from '../markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { StreamableValue } from 'ai/rsc'
import { useStreamableText } from '@/lib/hooks/use-streamable-text'
import Image from 'next/image'
import ReactSpeedometer, {
  CustomSegmentLabelPosition
} from 'react-d3-speedometer'

// Different types of message bubbles.

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="group relative flex gap-4 text-white  max-w-[768px]">
        <div className="bg-[#18898D] px-6 py-4 rounded-lg text-sm">
          {children}
        </div>
        <div className="flex size-[32px] md:size-[48px] shrink-0 select-none items-center justify-center rounded-full bg-primary shadow-sm">
          <IconUser width={48} height={48} />
        </div>
      </div>
    </div>
  )
}

export function BotCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex gap-4 max-w-[768px] my-4">
      <div className="flex size-[32px] md:size-[48px] shrink-0 select-none items-center justify-center rounded-md">
        <Image src="/header-logo.png" alt="bot-logo" width={48} height={48} />
      </div>
      <div className=" bg-white dark:bg-[#122830]  px-6 py-4 rounded-lg">
        {children}
      </div>
    </div>
  )
}

export function BotMessage({
  content,
  className
}: {
  content: string | StreamableValue<string>
  className?: string
}) {
  const text = useStreamableText(content)

  return (
    <>
      {text
        .split(/\n(?=##\s)/)
        .map(section => section.trim())
        .map((section, index) => {
          let chart = <> </>
          if (section.includes('Writing Style')) {
            const writingStyles = [
              'Professional',
              'Semi-Formal',
              'Neutral',
              'Casually-Formal',
              'Informal'
            ]
            const words = section.split(' ')
            words.some(word => {
              return writingStyles.some((style, index) => {
                if (word.includes(style)) {
                  chart = (
                    <ReactSpeedometer
                      value={(1000 * (index + 0.5)) / writingStyles.length}
                      currentValueText={style}
                      textColor="white"
                      width={400}
                      customSegmentLabels={[
                        {
                          text: 'Professional',
                          position: CustomSegmentLabelPosition.Outside,
                          color: 'white',
                          fontSize: '12px'
                        },
                        {
                          text: 'Semi-Formal',
                          position: CustomSegmentLabelPosition.Outside,
                          color: 'white'
                        },
                        {
                          text: 'Neutral',
                          position: CustomSegmentLabelPosition.Outside,
                          color: 'white'
                        },
                        {
                          text: 'Casually-Formal',
                          position: CustomSegmentLabelPosition.Outside,
                          color: 'white'
                        },
                        {
                          text: 'Informal',
                          position: CustomSegmentLabelPosition.Outside,
                          color: 'white'
                        }
                      ]}
                    />
                  )
                  return true // break
                }
                return false
              })
            })
          }

          return (
            <div
              className={cn(
                'group relative flex gap-4 max-w-[768px] my-4',
                className
              )}
              key={index}
            >
              <div className="flex size-[32px] md:size-[48px] shrink-0 select-none items-center justify-center rounded-md">
                <Image
                  src="/header-logo.png"
                  alt="bot-logo"
                  width={48}
                  height={48}
                />
              </div>
              <div className=" bg-white dark:bg-[#122830]  px-6 py-4 rounded-lg">
                <MemoizedReactMarkdown
                  className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 text-xs md:text-sm"
                  remarkPlugins={[remarkGfm, remarkMath]}
                  components={{
                    p({ children }) {
                      return <p className="mb-2 last:mb-0">{children}</p>
                    },
                    code({ node, inline, className, children, ...props }) {
                      if (children.length) {
                        if (children[0] == '▍') {
                          return (
                            <span className="mt-1 animate-pulse cursor-default">
                              ▍
                            </span>
                          )
                        }

                        children[0] = (children[0] as string).replace(
                          '`▍`',
                          '▍'
                        )
                      }

                      const match = /language-(\w+)/.exec(className || '')

                      if (inline) {
                        return (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        )
                      }

                      return (
                        <CodeBlock
                          key={Math.random()}
                          language={(match && match[1]) || ''}
                          value={String(children).replace(/\n$/, '')}
                          {...props}
                        />
                      )
                    }
                  }}
                >
                  {section}
                </MemoizedReactMarkdown>
                {chart}
              </div>
            </div>
          )
        })}
    </>
  )
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'
      }
    >
      <div className={'max-w-[600px] flex-initial p-2'}>{children}</div>
    </div>
  )
}

export function SpinnerMessage() {
  return (
    <div className="group relative flex">
      <div className="flex size-[48px] shrink-0 select-none items-center justify-center rounded-md">
        <Image src="/header-logo.png" alt="bot-logo" width={48} height={48} />
      </div>
      <div className="ml-4 h-[32px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
        <ChatSpinner />
      </div>
    </div>
  )
}
