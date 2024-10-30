import { createContext, useContext, useState, ReactNode } from 'react'
import { ClientMetadata } from '../types'

interface LeadgenContextProps {
  // brandName: string
  // setBrandName: (name: string) => void
  brandLogoUrl: string
  setBrandLogoUrl: (url: string) => void
  continuationText: string[]
  setContinuationText: (text: string[]) => void

  //  for initial message component in order to avoid duplicated calls
  logos: string[]
  setLogos: (logos: string[]) => void
  metadata: ClientMetadata | null
  setMetadata: (meta: ClientMetadata | null) => void
}

const LeadgenContext = createContext<LeadgenContextProps | undefined>(undefined)

interface LeadgenContextProviderProps {
  children: ReactNode
}

export const LeadgenContextProvider: React.FC<LeadgenContextProviderProps> = ({
  children
}) => {
  // const [brandName, setBrandName] = useState<string>('')
  const [brandLogoUrl, setBrandLogoUrl] = useState<string>('')
  const [continuationText, setContinuationText] = useState<string[]>([])

  const [logos, setLogos] = useState<string[]>([])
  const [metadata, setMetadata] = useState<ClientMetadata | null>(null)

  return (
    <LeadgenContext.Provider
      value={{
        // brandName,
        // setBrandName,
        brandLogoUrl,
        setBrandLogoUrl,
        continuationText,
        setContinuationText,
        logos,
        setLogos,
        metadata,
        setMetadata
      }}
    >
      {children}
    </LeadgenContext.Provider>
  )
}

export const useLeadgenContext = (): LeadgenContextProps => {
  const context = useContext(LeadgenContext)
  if (!context) {
    throw new Error('useLeadgenContext must be used within an LeadgenContext')
  }
  return context
}
