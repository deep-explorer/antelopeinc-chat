import React from 'react'
import * as BasicAccordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import './styles.css'

interface AccordionProps {
  title?: ReactElement | string
  containerBorderColor?: string
  children: ReactElement | ReactElement[]
}

export function Accordion({
  title,
  containerBorderColor,
  children
}: AccordionProps) {
  return (
    <BasicAccordion.Root
      className={`AccordionRoot border-[1px]`}
      type="single"
      collapsible
      style={{
        borderColor: containerBorderColor
      }}
    >
      <BasicAccordion.Item className="AccordionItem" value="item-1">
        <BasicAccordion.Header className="AccordionHeader">
          <BasicAccordion.Trigger className="AccordionTrigger">
            {title}
            <ChevronDownIcon className="AccordionChevron" aria-hidden />
          </BasicAccordion.Trigger>
        </BasicAccordion.Header>

        <BasicAccordion.Content>
          <div className="AccordionContentText">{children}</div>
        </BasicAccordion.Content>
      </BasicAccordion.Item>
    </BasicAccordion.Root>
  )
}
