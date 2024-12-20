import UserSaleInfo from './UserSaleInfo'

export default function Home() {
  const sampleSaleInfo = {
    id: "USR123456",
    itemName: "Wireless Headphones",
    number: "SKU78901",
    category: "Electronics",
    paymentMethod: "Credit Card",
    quantity: 2,
    saleDate: "2023-06-15",
    totalPrice: 199.99
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">User Sale Information</h1>
      <UserSaleInfo saleInfo={sampleSaleInfo} />
    </div>
  )
}

