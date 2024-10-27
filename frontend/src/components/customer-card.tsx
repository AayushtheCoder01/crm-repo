import { Card, CardContent } from "./ui/card"
import { CalendarDays, Mail, Phone, MapPin } from "lucide-react"

interface CustomerCardProps {
  name: string
  email: string
  phoneNumber: string
  customerSince: string
  city: string
  tpv: number
}

export function CustomerCard({ 
  name = "John Doe", 
  email = "john@example.com", 
  phoneNumber = "+1 (555) 123-4567", 
  customerSince = "2023-01-15",
  city = "New York, NY",
  tpv = 0
}: CustomerCardProps) {
  return (
    <Card className="w-[65vw] sm:w-[65vw] mb-4 cursor-pointer ">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-muted-foreground">{city}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-sm flex-wrap">
          <div className="flex items-center gap-2">
              <span className="truncate max-w-[200px] font-semibold">₹ {tpv}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <span className="truncate max-w-[200px]">{email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <span>{phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <span>{city}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <span>{new Date(customerSince).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}