import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import { Alert, AlertDescription } from "./ui/alert"
import {createProductFn} from "../functions/product.ts";
import {useNavigate} from "react-router-dom";

type ProductFormData = {
  name: string;
  productId: string;
  description: string;
  quantity: number;
  purchasePrice: number;
  brand: string;
}

export function AddNewProductComponent() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    productId: '',
    description: '',
    quantity: 0,
    purchasePrice: 0,
    brand: '',
  })
  const handleSubmit = async (e:any ) => {
    e.preventDefault()
    setIsSubmitting(true)
    const api: any = await createProductFn({productDetails: formData})
    console.log(api)
    if(api.data.success === true) {
      setSubmitSuccess(true)
      setIsSubmitting(false)
      navigate('/dashboard/products')
      window.location.reload()
    }
    if(api.data.success === false) {
      setSubmitSuccess(false)
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-5">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <CardDescription>Enter the details of the new product below.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input onChange={(e) => setFormData({ ...formData, name: e.target.value })} id="name" required={true}/>
          </div>
          <div>
            <Label htmlFor="productId">Product ID</Label>
            <Input onChange={(e) => setFormData({...formData, productId: e.target.value})} id="productId" required={true} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea onChange={(e) => setFormData({...formData, description: e.target.value})} id="description" required={true}/>
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input 
              id="quantity" 
              type="number"
              required={true}
              onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
            />
          </div>
          <div>
            <Label htmlFor="purchasePrice">Purchase Price</Label>
            <Input 
              id="purchasePrice" 
              type="number" 
              step="0.1"
              required={true}
              onChange={(e) => setFormData({...formData, purchasePrice: Number(e.target.value)})}
            />
          </div>
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input onChange={(e) => setFormData({...formData, brand: e.target.value})} id="brand" required={true} />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Product'}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {submitSuccess && (
          <Alert className="w-full">
            <AlertDescription>Product added successfully!</AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  )
}