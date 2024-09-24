import { createContext, useContext, useState, ReactNode } from 'react'

interface LeadgenContextProps {
  // brandName: string
  // setBrandName: (name: string) => void
  brandLogoUrl: string
  setBrandLogoUrl: (url: string) => void
  continuationText: string[]
  setContinuationText: (text: string[]) => void
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

  return (
    <LeadgenContext.Provider
      value={{
        // brandName,
        // setBrandName,
        brandLogoUrl,
        setBrandLogoUrl,
        continuationText,
        setContinuationText
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
