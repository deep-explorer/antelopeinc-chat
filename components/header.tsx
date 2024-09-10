'use client'
import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { Button, Switch } from '@radix-ui/themes'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'
import { Session } from '@/lib/types'
import { ThemeToggle } from './theme-toggle'
import Image from 'next/image'
import { companyUrl, ENVIRONMENT } from '@/lib/constants/config'
import { usePathname } from 'next/navigation'
import { useWindowSize } from 'usehooks-ts'
import { useParams } from 'next/navigation'
import { getMetaDataOnClient } from '@/lib/utils'
import { ClientMetadata } from '@/lib/types'
import { Skeleton } from '@radix-ui/themes'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'

/* 
async function UserOrLogin() {
  const session = (await auth()) as Session

  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href={companyUrl} rel="nofollow" className="flex gap-2">
          <img src={`/header-logo.png`} alt="logo" width={32} height={32} />
          <h2 className="text-xl">Antelope</h2>
        </Link>
      )}
      <div className="flex items-center">
        <IconSeparator className="size-6 text-muted-foreground/50" />
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </>
  )
}
*/
interface StaticTitles {
  title: string
  desc: string[]
}

const staticTitles = [
  {
    pathname: '/tools/linkedin-analyzer',
    data: {
      title: 'LinkedIn Profile Analyzer',
      desc: [
        "Reverse engineer the strengths and weaknesses of anyone's LinkedIn content strategy"
      ]
    }
  },
  {
    pathname: '/tools/content-intelligence',
    data: {
      title: 'Content Intelligence',
      desc: [
        'Analyze and tag social content with enriched data for competitive intelligence.'
      ]
    }
  },
  {
    pathname: '/tools/reddit-writer',
    data: {
      title: 'Reddit Ideator',
      desc: ['Turn on active Reddit thread into a compelling piece of content']
    }
  }
]

export const Header = () => {
  const { width: windowWidth } = useWindowSize()

  const pathname = usePathname()
  const params = useParams()

  const [metadata, setMetadata] = React.useState<
    ClientMetadata | StaticTitles | null
  >(null)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const { isBypassMode, setBypassMode } = useFreeChatContext()

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > (windowWidth > 768 ? 350 : 220)) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  React.useEffect(() => {
    if (params.brand) {
      setIsLoading(true)
      getMetaDataOnClient(params.brand).then(data => {
        setMetadata(data)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
      const foundTitle = staticTitles.find(t => t.pathname === pathname)?.data
      setMetadata(foundTitle || null)
    }
  }, [params])

  return (
    <>
      <header
        className={`scrolled p-4 lg:px-12 flex items-center justify-between w-full bg-[#122830] overflow-hidden ease-in-out transition-all duration-500 shadow-2xl ${isScrolled ? 'h-[48px] md:h-[80px]' : 'h-0 py-0'}`}
      >
        {isScrolled && (
          <>
            <div className="flex items-center">
              <Link href={companyUrl} rel="nofollow" className="flex gap-2">
                <img
                  src={`/header-logo.png`}
                  alt="logo"
                  width={32}
                  height={32}
                />
                <h2 className="text-xl">Antelope</h2>
              </Link>
            </div>
            <div className="hidden lg:flex gap-2 items-center">
              {params.brand === 'renzos' && (
                <div>
                  <img
                    src={`/vitamin/logos/renzos.png`}
                    alt="renzoslogo"
                    width={42}
                    height={42}
                  />
                </div>
              )}
              {isLoading ? (
                <Skeleton>
                  <h2 className="text-3xl font-semibold">
                    Children&apos;s Vitamins Analysis
                  </h2>
                </Skeleton>
              ) : (
                <p className="text-3xl font-semibold">{metadata?.title}</p>
              )}
            </div>
            <div className="flex gap-4 items-center">
              {(ENVIRONMENT === 'local' || ENVIRONMENT === 'development') && (
                <div className="flex gap-2">
                  <Switch
                    checked={isBypassMode}
                    size="3"
                    style={{ cursor: 'pointer' }}
                    onCheckedChange={checked => setBypassMode(checked)}
                  />
                  {isBypassMode ? (
                    <span>Bypass Mode</span>
                  ) : (
                    <span>Normal Mode</span>
                  )}
                </div>
              )}
              {/* <ThemeToggle /> */}
              <Button
                onClick={() => window.open(companyUrl, '_blank')}
                size={'2'}
              >
                Get in touch
              </Button>
            </div>
          </>
        )}
      </header>
      <header>
        <div className="p-4 lg:px-12 lg:py-8 flex items-center justify-between w-full bg-[#122830]  shadow-2xl">
          <div className="flex items-center">
            <Link href={companyUrl} rel="nofollow" className="flex gap-2">
              <img src={`/header-logo.png`} alt="logo" width={32} height={32} />
              <h2 className="text-xl">Antelope</h2>
            </Link>
          </div>
          <div className="hidden lg:flex items-center justify-end space-x-2 gap-12 text-lg">
            <Link href={`${companyUrl}/#banner`}>Home</Link>
            <Link href={`${companyUrl}/#benefits`}>What We Do</Link>
            <Link href={`${companyUrl}/case-study`}>Our Reports</Link>
            <Link href={`${companyUrl}/#process`}>Process</Link>
            <Link href={`${companyUrl}/blog/`}>Blog</Link>
          </div>
          <div className="flex gap-4 items-center">
            {(ENVIRONMENT === 'local' || ENVIRONMENT === 'development') && (
              <div className="flex gap-2">
                <Switch
                  checked={isBypassMode}
                  size="3"
                  style={{ cursor: 'pointer' }}
                  onCheckedChange={checked => setBypassMode(checked)}
                />
                {isBypassMode ? (
                  <span>Bypass Mode</span>
                ) : (
                  <span>Normal Mode</span>
                )}
              </div>
            )}
            {/* <ThemeToggle /> */}
            <Button
              onClick={() => window.open(companyUrl, '_blank')}
              size={'2'}
            >
              Get in touch
            </Button>
          </div>
        </div>
        <div className="text-center pt-8 md:pt-[64px] px-6 flex flex-col gap-4 md:gap-6">
          <h1
            className="text-xs md:text-base text-primary font-bold"
            style={{ letterSpacing: 2 }}
          >
            ANTELOPE CHATBOT
          </h1>

          {isLoading ? (
            <div className="flex flex-col gap-4 py-1 md:py-2 justify-center items-center">
              <Skeleton>
                <h2 className="text-3xl font-semibold">
                  Children&apos;s Vitamins Analysis
                </h2>
              </Skeleton>
              <Skeleton>
                <div className="text-[#B9CAD0] text-sm md:text-lg">
                  Analysis of children&apos;s vitamins in the market to assess
                  their benefits and shortcomings.
                </div>
              </Skeleton>
            </div>
          ) : (
            <>
              <p className="text-3xl font-semibold">{metadata?.title}</p>
              <div className="text-[#B9CAD0] text-sm md:text-lg">
                {metadata?.desc.map((d, i) => <p key={i}>{d}</p>)}
              </div>
            </>
          )}
        </div>
      </header>
    </>
  )
}
