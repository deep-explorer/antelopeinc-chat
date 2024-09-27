import { useRef } from 'react'

export function SimpleDialog({
  children,
  open,
  onClose
}: {
  children: React.ReactNode
  open: boolean
  onClose: () => void
}) {
  const innerRef = useRef<HTMLDivElement>(null)

  const handleClickOutside: React.MouseEventHandler<HTMLDivElement> = event => {
    if (innerRef.current && !innerRef.current.contains(event.target as Node)) {
      onClose()
    }
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'} bg-black bg-opacity-50`}
      onClick={handleClickOutside}
    >
      <div
        ref={innerRef}
        className="bg-background rounded-lg shadow-xl p-6 space-y-4 relative"
      >
        <button onClick={onClose} className="absolute top-3 right-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="size-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  )
}
