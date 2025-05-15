"use client"

import { FileText } from "lucide-react"

export function Invoice() {
  return (
    <div className="flex flex-col items-center justify-center py-12 border border-dashed rounded-md">
      <FileText className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-xl font-bold">No invoices generated yet</h3>
      <p className="text-muted-foreground">Use the "Generate Invoice" button to create a new invoice</p>
    </div>
  )
}
