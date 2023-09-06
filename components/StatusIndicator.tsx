import { decisionToStatusColor } from "@/utils"

export const StatusIndicator: React.FC<{ decision: string }> = ({ decision }) => {
  return <span className={`flex w-3 h-3 flex-shrink-0 rounded-full bg-${decisionToStatusColor(decision)}-200`} />
}
