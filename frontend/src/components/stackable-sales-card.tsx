import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { CalendarIcon, PhoneIcon, ShoppingCartIcon } from "lucide-react"

interface SalesCardProps {
  productName: string
  saleDate: string
  quantity: number
  phoneNumber: string,
  totalPrice: number
}

export function StackableSalesCard({ 
  productName , 
  saleDate, 
  quantity, 
  phoneNumber,
  totalPrice
}: SalesCardProps) {
  return (
    <Card className="w-[65vw] sm:w-[65vw] cursor-pointer mb-4 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="flex-none w-full sm:w-1/4 bg-muted p-4 flex items-center justify-center">
            <h3 className="text-lg font-semibold text-center">{productName}</h3>
          </div>
          <div className="flex-grow p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
            <div className="flex items-center space-x-2 text-sm mb-2 sm:mb-0">
              <CalendarIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>{new Date(saleDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm mb-2 sm:mb-0">
              <ShoppingCartIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>Qty: {quantity}</span>
              <Badge variant="secondary" className="text-xs">{quantity > 1 ? 'Items' : 'Item'}</Badge>
            </div>
            <div className="flex items-center space-x-2 text-sm mb-2 sm:mb-0">
              <span>₹ {totalPrice}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <PhoneIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>{phoneNumber}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}