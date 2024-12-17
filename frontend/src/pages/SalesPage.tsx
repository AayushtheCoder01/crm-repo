// import { getSalesFn } from "../functions/sales"
import { useRecoilValue } from "recoil"
import { SalesAtom, userDataAtom } from "../store/store"
import { StackableSalesCard } from "../components/stackable-sales-card"
import { useState } from "react"
import { SaleRegistrationComponent } from "../components/sale-registration"
import {Input} from "../components/ui/input.tsx";
import {Search} from "lucide-react";


 function SalesPage() {
    const todayDate = new Date().toLocaleDateString()
    const salesAtom = useRecoilValue(SalesAtom)
     const todaySales = salesAtom.filter((sale: any) => new Date(sale.saleDate).toLocaleDateString() === todayDate)
     const sales = salesAtom.filter((sale: any)=> new Date(sale.saleDate).toLocaleDateString() != todayDate)

    const isLogin = useRecoilValue(userDataAtom)
    const [newSale, setNewSale] = useState(false)
     const [search, setSearch] = useState(false)
     const [searchSales, setSearchSales] = useState([])

     function filterCustomers(e: any) {
        if (e.target.value === '') {
            setSearch(false)
        } else {
            setSearch(true)
        }
         const filterdSales = salesAtom.filter((sale: any) => {
             return sale.itemname.toLowerCase().includes(e.target.value.toLowerCase()) ||
                 sale.number.toString().includes(e.target.value.toLocaleLowerCase())
         })

         setSearchSales(filterdSales)
     }

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
                        <div className='mr-4 flex'>
                            <Input onChange={(e: any) => filterCustomers(e)} placeholder='e.g. product name, number'
                                   className='border-2 rounded-full w-[15rem]'></Input>
                            <Search className='mt-2 ml-2 mr-2'/>
                            <div className='flex justify-end w-full'>
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => setNewSale(!newSale)}>New Sale
                                </button>
                            </div>
                        </div>
                        : null
                }

                {
                    newSale && <SaleRegistrationComponent/>
                }
            </div>
            <div className="text-start">
                {
                    todaySales.length && !search?
                        <h2 className="text-2xl font-semibold mb-4 text-zinc-700 px-2">Today's Sales</h2> :
                        <h2 className="text-2xl font-semibold mb-4 text-zinc-700 px-2"></h2>
                }
                {
                    todaySales.map((sale: any, index: any) => (
                        <StackableSalesCard key={index} productName={sale.itemname} saleDate={sale.saleDate}
                                            quantity={sale.quantity} phoneNumber={sale.number} totalPrice={sale.totalPrice}/>
                    ))
                }
            </div>

            {sales.length && !search?
                <h2 className="text-start text-2xl font-bold mb-4 mt-14 text-zinc-700 px-2">Previous Sales</h2> :
                <h2 className="text-start text-2xl font-bold mb-4 mt-14 text-zinc-700 px-2"></h2>
            }

            {
                search ? null :
                    <div>
                        {sales.map((sale: any, index: any) => (

                            <StackableSalesCard key={index} productName={sale.itemname} saleDate={sale.saleDate}
                                                quantity={sale.quantity} phoneNumber={sale.number}
                                                totalPrice={sale.totalPrice}/>
                        ))}
                    </div>
            }

            {
                search ?
                    <div>
                        {searchSales.map((sale: any, index: any) => (
                            <StackableSalesCard key={index} productName={sale.itemname} saleDate={sale.saleDate}
                                                quantity={sale.quantity} phoneNumber={sale.number}
                                                totalPrice={sale.totalPrice}/>
                        ))}
                    </div>
                    : null
            }
            {
               search && !searchSales.length?
                   <div className="flex h-full w-full justify-center items-center text-zinc-400">
                        <p>Query not found!</p>
                   </div> : null
            }
        </div>
    )
 }

export default SalesPage