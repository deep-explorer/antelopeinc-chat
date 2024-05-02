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
import { useWindowSize } from 'usehooks-ts'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'

// Different types of message bubbles.

export function UserMessage({ children }: { children: React.ReactNode }) {
  const { width: windowWidth } = useWindowSize()
  const pathname = usePathname()

  return (
    <div className="grid place-items-end">
      <div className="group relative flex gap-2 md:gap-4 text-white max-w-[300px] sm:max-w-[600px] lg:max-w-[768px]">
        <div className="bg-[#18898D] px-3 md:px-6 py-2 md:py-4 rounded-sm md:rounded-lg overflow-x-auto text-sm">
          {children}
        </div>
        <div className="flex size-[24px] md:size-[48px] shrink-0 select-none items-center justify-center rounded-full bg-primary shadow-sm">
          {pathname === '/vitamin-analyzer' ? (
            <Image
              src={'/icon-images/renzon.png'}
              width={windowWidth >= 768 ? 48 : 24}
              height={windowWidth >= 768 ? 48 : 24}
              alt="user-logo"
            />
          ) : (
            <IconUser
              width={windowWidth >= 768 ? 48 : 24}
              height={windowWidth >= 768 ? 48 : 24}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export function BotCard({ children }: { children: React.ReactNode }) {
  const { width: windowWidth } = useWindowSize()

  return (
    <div className="group relative flex gap-2 md:gap-4  max-w-[768px] my-4">
      <div className="flex size-[24px] md:size-[48px] shrink-0 select-none items-center justify-center rounded-md">
        <Image
          src="/header-logo.png"
          alt="bot-logo"
          width={windowWidth >= 768 ? 48 : 24}
          height={windowWidth >= 768 ? 48 : 24}
        />
      </div>
      <div className=" bg-white dark:bg-[#122830] px-3 md:px-6 py-2 md:py-4 rounded-sm md:rounded-lg overflow-x-auto">
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
  const { width: windowWidth } = useWindowSize()
  const { theme } = useTheme()

  return (
    <>
      {text
        .split(/\n(?=##\s)/)
        .map(section => section.trim())
        .map((section, index) => {
          //  TODO: refactoring
          let chart = <> </>
          if (section.includes('Writing Style')) {
            const writingStyles = [
              'Informal',
              'Casually-Formal',
              'Neutral',
              'Semi-Formal',
              'Professional'
            ]
            const words = section.split(' ')
            words.some(word => {
              return writingStyles.some((writingStyle, index) => {
                if (word.includes(writingStyle)) {
                  chart = (
                    <ReactSpeedometer
                      value={(1000 * (index + 0.5)) / writingStyles.length}
                      currentValueText={writingStyle}
                      textColor={theme === 'dark' ? 'white' : 'black'}
                      width={windowWidth > 768 ? 400 : 250}
                      height={windowWidth > 768 ? 250 : 150}
                      segmentColors={[
                        '#FF784D',
                        '#F49650',
                        '#B6DBD9',
                        '#18898D',
                        '#2F616A'
                      ]}
                      customSegmentLabels={[
                        {
                          text: 'Informal',
                          position: CustomSegmentLabelPosition.Outside,
                          fontSize: windowWidth > 768 ? '12px' : '10px',
                          color: theme === 'dark' ? 'white' : 'black'
                        },
                        {
                          text: 'Casually-Formal',
                          position: CustomSegmentLabelPosition.Outside,
                          fontSize: windowWidth > 768 ? '12px' : '10px',
                          color: theme === 'dark' ? 'white' : 'black'
                        },
                        {
                          text: 'Neutral',
                          position: CustomSegmentLabelPosition.Outside,
                          fontSize: windowWidth > 768 ? '12px' : '10px',
                          color: theme === 'dark' ? 'white' : 'black'
                        },
                        {
                          text: 'Semi-Formal',
                          position: CustomSegmentLabelPosition.Outside,
                          fontSize: windowWidth > 768 ? '12px' : '10px',
                          color: theme === 'dark' ? 'white' : 'black'
                        },
                        {
                          text: 'Professional',
                          position: CustomSegmentLabelPosition.Outside,
                          fontSize: windowWidth > 768 ? '12px' : '10px',
                          color: theme === 'dark' ? 'white' : 'black'
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
                'group relative flex gap-2 md:gap-4 max-w-[768px] my-4',
                className
              )}
              key={index}
            >
              <div className="flex size-[24px] md:size-[48px] shrink-0 select-none items-center justify-center rounded-md">
                <Image
                  src="/header-logo.png"
                  alt="bot-logo"
                  width={windowWidth >= 768 ? 48 : 24}
                  height={windowWidth >= 768 ? 48 : 24}
                />
              </div>
              <div className=" bg-white dark:bg-[#122830] px-3 md:px-6 py-2 md:py-4 rounded-sm md:rounded-lg overflow-x-auto">
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
                    },
                    a({ children, ...props }) {
                      return (
                        <a className="underline" target="_blank" {...props}>
                          {children}
                        </a>
                      )
                    }
                  }}
                >
                  {section}
                </MemoizedReactMarkdown>
                <div className="py-2 md:py-4 flex justify-center">{chart}</div>
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
  const { width: windowWidth } = useWindowSize()

  return (
    <div className="group relative flex">
      <div className="flex size-[24px] md:size-[48px] shrink-0 select-none items-center justify-center rounded-md">
        <Image
          src="/header-logo.png"
          alt="bot-logo"
          width={windowWidth >= 768 ? 48 : 24}
          height={windowWidth >= 768 ? 48 : 24}
        />
      </div>
      <div className="ml-4 h-[32px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
        <ChatSpinner />
      </div>
    </div>
  )
}
