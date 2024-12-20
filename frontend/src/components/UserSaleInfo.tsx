import { Table, TableBody, TableCell, TableRow } from "../components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import {useNavigate} from "react-router-dom";

interface SaleInfo {
  id: string
  itemname: string
  number: string
  category: string
  paymentMethod: string
  quantity: number
  saleDate: string
  totalPrice: number
}

interface UserSaleInfoProps {
  saleInfo: SaleInfo
}

export default function UserSaleInfo({ saleInfo }: UserSaleInfoProps) {
  const navigate = useNavigate()
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Sale Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">ID</TableCell>
              <TableCell>{saleInfo.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Item Name</TableCell>
              <TableCell>{saleInfo.itemname}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Customer Number</TableCell>
              <TableCell>{saleInfo.number}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Category</TableCell>
              <TableCell>{saleInfo.category || "N/A"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Payment Method</TableCell>
              <TableCell>{saleInfo.paymentMethod || "cash"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Quantity</TableCell>
              <TableCell>{saleInfo.quantity}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Sale Date</TableCell>
              <TableCell>{new Date(saleInfo.saleDate).toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Total Price</TableCell>
              <TableCell>₹ {saleInfo.totalPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Customer</TableCell>
              <TableCell onClick={() => navigate(`/details/customer/${saleInfo.number}`)} className={'text-blue-500 hover:underline cursor-pointer'}>See details</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

