import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function General() {
  return (
    <div>
      <p className="text-sm sm:text-base text-muted-foreground mb-4">Configure your business information and preferences</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="businessName" className="text-sm font-medium">Business Name</label>
          <input 
            id="businessName"
            type="text" 
            placeholder="Your Business Name" 
            className="w-full p-2 border rounded-md text-sm"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Business Email</label>
          <input 
            id="email"
            type="email" 
            placeholder="contact@yourbusiness.com" 
            className="w-full p-2 border rounded-md text-sm"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">Business Phone</label>
          <input 
            id="phone"
            type="tel" 
            placeholder="+1 (555) 555-5555" 
            className="w-full p-2 border rounded-md text-sm"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="currency" className="text-sm font-medium">Currency</label>
          <Select>
            <SelectTrigger id="currency" className="w-full text-sm">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="GBP">GBP (£)</SelectItem>
              <SelectItem value="INR">INR (₹)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <label htmlFor="address" className="text-sm font-medium">Business Address</label>
        <textarea 
          id="address"
          placeholder="Enter your business address" 
          className="w-full p-2 border rounded-md text-sm"
          rows={3}
        ></textarea>
      </div>
      
      <div className="mt-6">
        <Button className="flex items-center gap-2 w-full sm:w-auto">
            Save Changes
          </Button>
      </div>
    </div>
  )
}