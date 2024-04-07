import { SidebarDesktop } from '@/components/sidebar-desktop'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="py-[100px]">
      <div className="text-center mb-8">
        <h1 className="text-primary">RESULT</h1>
        <h2 className="text-3xl my-4">Nike's competitor report</h2>
        <p>Innovative AI-powered competitive intelligence at your fingertips</p>
      </div>
      {children}
    </div>
  )
}
