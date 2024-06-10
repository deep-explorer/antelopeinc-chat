'use client'

import * as React from 'react'
import { ENVIRONMENT } from '../constants/config'

interface FreeChatContext {
  linkedinPosts: string //  TODO: parse linkedin posts
  userEmail: string
  isEmailVerified: boolean
  setLinkedinPosts: (posts: string) => void
  setUserEmail: (email: string) => void
  setEmailVerified: (verified: boolean) => void

  isScheduleDialogOpened: boolean //  TODO: move to UI context
  openScheduleDialog: (flag: boolean) => void //  TODO: move to UI context

  footerButtonIndex: number //  TODO: move to UI context
  setFooterButtonIndex: (index: number) => void //  TODO: move to UI context

  loadingMessage: string
  setLoadingMessage: (message: string) => void

  isBypassMode: boolean
  setBypassMode: (flag: boolean) => void
}

const FreeChatContext = React.createContext<FreeChatContext>({
  linkedinPosts: '',
  userEmail: '',
  isEmailVerified: false,
  setLinkedinPosts: () => {},
  setUserEmail: () => {},
  setEmailVerified: () => {},

  isScheduleDialogOpened: false,
  openScheduleDialog: () => {},
  footerButtonIndex: 0,
  setFooterButtonIndex: () => {},

  loadingMessage: '',
  setLoadingMessage: (message: string) => {},

  isBypassMode: false,
  setBypassMode: () => {}
})

export function useFreeChatContext() {
  const context = React.useContext(FreeChatContext)
  if (!context) {
    throw new Error('useFreeChatContext must be used within a FreeChatProvider')
  }
  return context
}

interface FreeChatProviderProps {
  children: React.ReactNode
}

export function FreeChatProvider({ children }: FreeChatProviderProps) {
  const [linkedinPosts, setLinkedinPosts] = React.useState('')
  const [userEmail, setUserEmail] = React.useState('')
  const [isEmailVerified, setEmailVerified] = React.useState(false)
  const [isScheduleDialogOpened, openScheduleDialog] = React.useState(false)
  const [footerButtonIndex, setFooterButtonIndex] = React.useState(0)
  const [loadingMessage, setLoadingMessage] = React.useState('')
  const [isBypassMode, _setBypassMode] = React.useState(false)

  const setBypassMode = (flag: boolean) => {
    if (ENVIRONMENT === 'development') {
      _setBypassMode(flag)
    } else {
      console.warn(
        'This is a production environment. Bypass mode is not allowed.'
      )
    }
  }

  return (
    <FreeChatContext.Provider
      value={{
        linkedinPosts,
        userEmail,
        isEmailVerified,
        setLinkedinPosts,
        setUserEmail,
        setEmailVerified,
        isScheduleDialogOpened,
        openScheduleDialog,
        footerButtonIndex,
        setFooterButtonIndex,
        loadingMessage,
        setLoadingMessage,
        isBypassMode,
        setBypassMode
      }}
    >
      {children}
    </FreeChatContext.Provider>
  )
}
