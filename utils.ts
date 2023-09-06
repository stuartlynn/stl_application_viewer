export const statusColor: Record<string, string> = {
  "Grant Licence": 'green',
  "Refer to Licensing Sub Committee": 'yellow',
  "Application Withdrawn": 'red',
}

export function decisionToStatusColor(decision: string) {
  return decision in statusColor ? statusColor[decision] : 'yellow'
}
