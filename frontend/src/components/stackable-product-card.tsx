import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Package, DollarSign, CalendarIcon } from "lucide-react"

interface ProductCardProps {
  itemId?: string
  productName?: string
  quantity?: number
  purchasePrice?: number
  dateAdded?: string
}

export function StackableProductCard({
  itemId = "ITEM001",
  productName = "Wireless Bluetooth Headphones",
  quantity = 50,
  purchasePrice = 79.99,
  dateAdded = ""
}: ProductCardProps) {
  return (
    <div className="w-[65vw] sm:w-[65vw] mb-4">
      <Card className="w-[65vw] sm:w-[65vw] cursor-pointer">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex-grow flex flex-col sm:flex-row sm:items-center mb-2 sm:mb-0">
              <div className="font-semibold text-lg mr-4 mb-2 sm:mb-0">{productName}</div>
              <Badge variant="outline" className="text-xs mb-2 sm:mb-0 sm:mr-4">
                ID: {itemId}
              </Badge>
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Qty: {quantity}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm mb-2 sm:mb-0">
              <CalendarIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>{new Date(dateAdded).toLocaleDateString()}</span>
            </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">${purchasePrice}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {quantity > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}