import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'
import { buttonVariants } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'

export function Footer({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <div
      className="bg-[#122830] text-white flex flex-col gap-8 text-sm md:text-base m-[-24px] md:mx-[-48px] md:my-[-80px] p-6 md:px-12 md:py-20"
      // className={cn(
      //   'px-2 text-center text-xs leading-normal text-muted-foreground',
      //   className
      // )}
      // {...props}
    >
      <div className="flex justify-between">
        <img src="/bottom-logo.png" alt="bottom-logo" width={131} height={55} />
        <a
          target="_blank"
          href="https://linkedin.com/"
          className="items-center"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 1C1.44772 1 1 1.44772 1 2V13C1 13.5523 1.44772 14 2 14H13C13.5523 14 14 13.5523 14 13V2C14 1.44772 13.5523 1 13 1H2ZM3.05 6H4.95V12H3.05V6ZM5.075 4.005C5.075 4.59871 4.59371 5.08 4 5.08C3.4063 5.08 2.925 4.59871 2.925 4.005C2.925 3.41129 3.4063 2.93 4 2.93C4.59371 2.93 5.075 3.41129 5.075 4.005ZM12 8.35713C12 6.55208 10.8334 5.85033 9.67449 5.85033C9.29502 5.83163 8.91721 5.91119 8.57874 6.08107C8.32172 6.21007 8.05265 6.50523 7.84516 7.01853H7.79179V6.00044H6V12.0047H7.90616V8.8112C7.8786 8.48413 7.98327 8.06142 8.19741 7.80987C8.41156 7.55832 8.71789 7.49825 8.95015 7.46774H9.02258C9.62874 7.46774 10.0786 7.84301 10.0786 8.78868V12.0047H11.9847L12 8.35713Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
      <hr className="hidden md:block border-t-2 border-[#3D565F]" />
      <div className="flex justify-between">
        <p className="hidden md:block">
          Copyright © 2023 Antelope Inc. All Rights Reserved
        </p>
        <div className="flex justify-between min-w-full md:justify-normal md:min-w-0 md:gap-4">
          <Link href={'/'}>Terms of Service</Link>
          <Link href={'/'}>Privacy</Link>
          <Link href={'/'}>Cookie Policy</Link>
        </div>
      </div>
      <hr className="block md:hidden border-t-2 border-[#3D565F]" />
      <p className="block md:hidden text-center">
        Copyright © 2023 Antelope Inc.
        <br /> All Rights Reserved
      </p>
    </div>
  )
}
