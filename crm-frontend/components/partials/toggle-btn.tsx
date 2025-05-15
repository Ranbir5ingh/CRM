"use client"

import { Switch } from "@/components/ui/switch"

interface ToggleBtnProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function ToggleBtn({ checked = false, onCheckedChange }: ToggleBtnProps) {
  return <Switch checked={checked} onCheckedChange={onCheckedChange} />
}
