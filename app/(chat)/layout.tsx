import { SidebarDesktop } from '@/components/sidebar-desktop'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="py-14 md:py-[100px]">
      <div className="text-center mb-8">
        <h1 className="text-primary">Antelop Chatbot</h1>
        <h2 className="text-3xl my-4">LinkedIn Profile Analyzer</h2>
        <p>Enter any LinkedIn URL to reverse engineer their content strategy</p>
      </div>
      {children}
    </div>
  )
}
