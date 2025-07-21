import * as React from "react"

export function Tooltip({ children }: { children: React.ReactNode }) {
  return <span>{children}</span>
}

export function TooltipTrigger({ children }: { children: React.ReactNode }) {
  return <span>{children}</span>
}

export function TooltipContent({ children }: { children: React.ReactNode }) {
  return <span>{children}</span>
}

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
