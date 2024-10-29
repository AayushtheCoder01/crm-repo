// import { getSalesFn } from "../functions/sales"
import { useRecoilValue } from "recoil"
import { SalesAtom, userDataAtom } from "../store/store"
import { StackableSalesCard } from "../components/stackable-sales-card"
import { useState } from "react"
import { SaleRegistrationComponent } from "../components/sale-registration"


 function SalesPage() {
    const salesAtom = useRecoilValue(SalesAtom)
    const isLogin = useRecoilValue(userDataAtom)
    const [newSale, setNewSale] = useState(false)
    // async function getSales() {
    //     const api = await getSalesFn()
    //     setAtom(api?.data.sales)
    // }
    return (
    <div className="text-center p-2">
      
      <div className="my-3 mb-5
      ">

        {
          isLogin.id? <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-2 rounded" onClick={() => setNewSale(!newSale)}>New Sale</button>: null 
        }

          {
              newSale && <SaleRegistrationComponent/>
          }
        </div>
        {salesAtom.map((sale :any, index: any) => (
        <StackableSalesCard key={index} productName={sale.itemname} saleDate={sale.saleDate} quantity={sale.quantity} phoneNumber={sale.number} />
      ))}
    </div>
  )
}

export default SalesPage