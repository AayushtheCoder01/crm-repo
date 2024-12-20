import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

interface ProductCardWideProps {
  productName: string
  price: number
  quantity: number
}

export default function ProductCardWide({ productName, price, quantity }: ProductCardWideProps) {
  return (
    <Card className="w-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-6 flex justify-between gap-4 items-center">
        <div>
          <h3 className="text-xl font-semibold mb-2 line-clamp-2">{productName}</h3>
        </div>

        <div className='flex'>
            <Badge variant="secondary" className="text-sm mr-4">
              Qty: {quantity}
            </Badge>
            <p className="text-3xl font-semibold text-primary text-right">₹ {price}</p>
          </div>
      </CardContent>
    </Card>
  )
}

