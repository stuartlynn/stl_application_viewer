import { decisionToStatusColor } from "@/utils"

export const StatusIndicator: React.FC<{ decision: string }> = ({ decision }) => {
  let color = decisionToStatusColor(decision)

  if (color === 'red') { return <span className={`flex w-3 h-3 flex-shrink-0 rounded-full bg-red-500 `} /> }
  if (color === 'green') { return <span className={`flex w-3 h-3 flex-shrink-0 rounded-full bg-green-500 `} /> }
  if (color === 'yellow') { return <span className={`flex w-3 h-3 flex-shrink-0 rounded-full bg-yellow-500 `} /> }
  return
}
