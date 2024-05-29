import { Button } from '@/components/ui/button'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'

export function ScheduleMessage({ response }: { response: string }) {
  const { openScheduleDialog } = useFreeChatContext()

  return (
    <>
      <p className="mb-4 text-sm">{response}</p>
      <Button className="w-full" onClick={() => openScheduleDialog(true)}>
        Schedule appointment
      </Button>
    </>
  )
}
