import { useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Plus, X } from 'lucide-react'
import axios from 'axios'
import { ProductsAtom } from '../store/store'
import { useRecoilValue } from 'recoil'

interface Item {
  id: string;
  productname: string;
  price: number;
  quantity: number;
}

export function SaleRegistrationComponent() {
  const productsAtom = useRecoilValue(ProductsAtom)

  // add itemname quantity and total price
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState(new Date().getFullYear())
  const [itemname, setItmename] = useState('')
  const [quantity, setQuantity] = useState(0)
  const totalPrice = useRef(0)
  const [items, setItems] = useState<Item[]>([])
  const [newItem, setNewItem] = useState<Item>({ id: '', productname: '', price: 0, quantity: 0 })
  const [isAddingItem, setIsAddingItem] = useState(false)

  const handleAddItem = () => {
    if (newItem.id && newItem.productname && newItem.price > 0) {
      setItems([...items, newItem])
      setNewItem({ id: '', productname: '', price: 0, quantity: 0 })
      setIsAddingItem(false)
    }
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const calculateTotal = () => {
    const total = Number(items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2))
    totalPrice.current = total
    return total
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault() 
    const api = axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/sale/create`, {
      customername: name,
      number: Number(number),
      email: email,
      address: address,
      city: city,
      year: Number(year),
      month: Number(month),
      itemname: itemname,
      quantity: quantity,
      totalPrice: calculateTotal(),
      productIds: items,
      
    },
    {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      }
    }
  )
    console.log(api)
    if((await api).data.success === true) {
      window.location.reload()
  }else{
    alert("error")
  }
  }
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Sale Registration</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Number</Label>
              <Input id="number" value={number} onChange={(e) => setNumber(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="month">Month</Label>
              <Input id="month" value={month} onChange={(e) => setMonth(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} required />
            </div>
          
            <div className="space-y-2">
              <Label htmlFor="year">Item Name</Label>
              <Input id="year" value={itemname} onChange={(e) => setItmename(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Quantity</Label>
              <Input id="year" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Items</Label>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                  <span>{item.productname} - ₹{item.price.toFixed(2)}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Item</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="item-id">Item ID</Label>
                    <select
                      onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
                      id="options" name="options">
                      {productsAtom.map((product:any) => (
                        <option key={product.id} value={product.id}>{product.productId}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="item-name">Item Name</Label>
                    <Input
                      id="item-name"
                      value={newItem.productname}
                      onChange={(e) => setNewItem({ ...newItem, productname: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="item-name">quantity</Label>
                    <Input
                      id="item-name"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value)})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="item-price">Item Price</Label>
                    <Input
                      id="item-price"
                      type="number"
                      onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                <Button onClick={handleAddItem}>Add Item</Button>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-2">
            <Label>Total Price</Label>
            <div className="text-2xl font-bold">{calculateTotal()}</div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Register Sale</Button>
        </CardFooter>
      </form>
    </Card>
  )
}