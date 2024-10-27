import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import {createCustomerFn} from "../functions/customer.ts";
import {useNavigate} from "react-router-dom";
export function CreateCustomerFormComponent() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    customername: '',
    number: '',
    address: '',
    email: '',
    city: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Reset form after submission
    const api:any = await createCustomerFn({customerDetails: formData})
    console.log(api)
    if(api.data.success === true) {
      setFormData({
        customername: '',
        number: '',
        address: '',
        email: '',
        city: ''
      })
      navigate('/dashboard/customer')
      window.location.reload()
    }
  }
  return (
    <div className="w-full flex justify-center items-center w-full mt-7">
      <Card className="w-[70%] shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Create Customer</CardTitle>
          <CardDescription>Enter the customer's details below</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customername"
                  name="customername"
                  placeholder="John Doe"
                  value={formData.customername}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Phone Number</Label>
                <Input
                  id="number"
                  name="number"
                  type="number"
                  placeholder="+1 (555) 000-0000"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St, Apt 4B"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="New York"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full md:w-auto md:min-w-[200px] mx-auto">
              Create Customer
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}