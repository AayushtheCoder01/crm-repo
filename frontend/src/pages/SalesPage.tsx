// import { getSalesFn } from "../functions/sales"
import { useRecoilValue } from "recoil"
import { SalesAtom, userDataAtom } from "../store/store"
import { StackableSalesCard } from "../components/stackable-sales-card"
import { useState } from "react"
import { SaleRegistrationComponent } from "../components/sale-registration"


 function SalesPage() {
    const todayDate = new Date().toLocaleDateString()
    const salesAtom = useRecoilValue(SalesAtom)
     const todaySales = salesAtom.filter((sale: any) => new Date(sale.saleDate).toLocaleDateString() === todayDate)
     const sales = salesAtom.filter((sale: any)=> new Date(sale.saleDate).toLocaleDateString() != todayDate)

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
                    isLogin.id ?
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-2 rounded"
                                onClick={() => setNewSale(!newSale)}>New Sale</button> : null
                }

                {
                    newSale && <SaleRegistrationComponent/>
                }
            </div>
            <div className="text-start">
                {
                    todaySales.length ?
                        <h2 className="text-2xl font-semibold mb-4 text-zinc-700 px-2">Today's Sales</h2> :
                        <h2 className="text-2xl font-semibold mb-4 text-zinc-700 px-2">Today's Sales: 0</h2>
                }
                {
                    todaySales.map((sale: any, index: any) => (
                        <StackableSalesCard key={index} productName={sale.itemname} saleDate={sale.saleDate}
                                            quantity={sale.quantity} phoneNumber={sale.number} totalPrice={sale.totalPrice}/>
                    ))
                }
            </div>

            {sales.length ?
                <h2 className="text-start text-2xl font-bold mb-4 mt-14 text-zinc-700 px-2">Previous Sales</h2> :
                <h2 className="text-start text-2xl font-bold mb-4 mt-14 text-zinc-700 px-2">Previous Sales: 0</h2>
            }
            {sales.map((sale: any, index: any) => (
                <StackableSalesCard key={index} productName={sale.itemname} saleDate={sale.saleDate}
                                    quantity={sale.quantity} phoneNumber={sale.number} totalPrice={sale.totalPrice}/>
            ))}
        </div>
    )
 }

export default SalesPage