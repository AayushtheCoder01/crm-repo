import {Link, useNavigate, useParams} from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";
import {Input} from "../../components/ui/input.tsx";
import {Label} from "@radix-ui/react-label";
import SpinnyWrapper from "spinny-loader/wrapper";
import { WavyBars } from 'spinny-loader';
import {StackableSalesCard} from "../../components/stackable-sales-card.tsx";
import {Pen, X} from "lucide-react";
import {Button} from "../../components/ui/button.tsx";
import {deleteCustomerFn, getCustomerFn} from "../../functions/customer.ts";
import {useSetRecoilState} from "recoil";
import {CustomerAtom} from "../../store/store.ts";
function CustomerDetails() {
    const {number} = useParams()
    const [customerData, setCustomerData]: any = useState({})
    const [resetData, setResetData]: any = useState({})
    const [loading, setLoading] = useState(false)
    const [editable, setEditable] = useState(false)

    const navigate = useNavigate()
    const setCustomerAtom = useSetRecoilState(CustomerAtom)
    async function getCustomer() {
        setLoading(true)
        try {
            const Backend_URL = import.meta.env.VITE_BACKEND_URL
            const customer = await axios.get(`${Backend_URL}/api/v1/customer/get/${number}`, {
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            })
            setCustomerData(customer.data.customer)
            setResetData(customer.data.customer)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("error", error)
        }
    }
    // console.log(customerData)
    async function updateCustomerFn() {
        setEditable(false)
        setLoading(true)
        const Backend_URL = import.meta.env.VITE_BACKEND_URL
        try {
            const customer = await axios.put(`${Backend_URL}/api/v1/customer/update/${number}`, customerData, {
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            })
            setCustomerData(customer.data.customer)
            setResetData(customer.data.customer)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("error", error)
        }
    }

    async function deleteCustomer(number: number) {
        setLoading(true)
        await deleteCustomerFn({number: number})
        const customers: any = await getCustomerFn()
        setCustomerAtom(customers.data.customer)
        navigate("/dashboard/customers")
        setLoading(false)
    }
    function editFunction() {
        setEditable(!editable)
        setCustomerData(resetData)
    }
    useEffect(() => {
        getCustomer()
    }, []);
    if(loading){
        return <div>
            <SpinnyWrapper backgroundEffect={false}><WavyBars></WavyBars></SpinnyWrapper>
        </div>
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center h-auto min-h-[70vh] w-full mt-12 sm:mt-0'>
                <div className='h-auto w-[80%] lg:w-[50%] rounded-lg pt-3 flex flex-col border-2'>
                    <div className='flex justify-end mr-4'>
                        <div onClick={() => editFunction()}>
                            {
                                editable? <X className={"hover:cursor-pointer"}/>:
                                    <Pen className={"hover:cursor-pointer"} size={"1.4rem"}/>
                            }
                        </div>
                    </div>
                    <h2 className='text-xl font-semibold'>Customer Details</h2>
                    <div className="flex flex-wrap items-center justify-center w-full p-3 pt-5">
                        <div className='flex items-start font-semibold flex-col p-3 min-w-12/12'>
                            <Label className={'pl-1'}>Name</Label>
                            <Input value={customerData.name} onChange={(e:any) =>{if (editable){setCustomerData({...customerData, name: e.target.value})}}} className={'w-full'}/>
                        </div>
                        <div className='flex items-start font-semibold flex-col p-3 min-w-12/12'>
                            <Label className={'pl-1'}>Number</Label>
                            <Input type={"number"} value={customerData.number} readOnly={true} className={'w-full'}/>
                        </div>
                        <div className='flex items-start font-semibold flex-col p-3 min-w-6/12'>
                            <Label className={'pl-1'}>City</Label>
                            <Input value={customerData.city} onChange={(e:any) =>{if (editable){setCustomerData({...customerData, city: e.target.value})}}} className={'w-full'}/>
                        </div>
                        <div className='flex items-start font-semibold flex-col p-3 min-w-6/12'>
                            <Label className={'pl-1'}>Email</Label>
                            <Input value={customerData.email} onChange={(e:any) =>{if (editable){setCustomerData({...customerData, email: e.target.value})}}} className={'w-full'}/>
                        </div>
                        <div className='flex items-start font-semibold flex-col p-3 min-w-6/12'>
                            <Label className={'pl-1'}>Total Purchase Value</Label>
                            <Input type={'number'} min={0} value={customerData.tpv} onChange={(e:any) =>{if (editable){setCustomerData({...customerData, tpv: parseInt(e.target.value)})}}} className={'w-full'}/>
                        </div>
                        <div className='flex items-start font-semibold flex-col p-3 min-w-6/12'>
                            <Label className={'pl-1'}>Customer Since</Label>
                            <Input value={new Date(customerData.createdAt).toLocaleString()} readOnly={true} className={'w-full'}/>
                        </div>
                        <div className='flex items-start font-semibold flex-col p-3'>
                            <Label className={'pl-1'}>Address</Label>
                            <Input value={customerData.address} onChange={(e:any) =>{if (editable){setCustomerData({...customerData, address: e.target.value})}}} className={'w-[100%]'}/>
                        </div>
                    </div>
                    <div className='flex w-full justify-center mb-5'>
                        {
                            editable? <Button className={'mx-3 bg-transparent border-2 border-red-700 text-black dark:text-white hover:bg-red-600'} onClick={() => deleteCustomer(customerData.number)}>Delete</Button> : null
                        }
                        {
                            editable? <Button onClick={() => updateCustomerFn()}>Save</Button> : null
                        }
                    </div>
                </div>
                <div className='mt-[2.5rem]'>
                    <h3 className='text-2xl font-semibold text-start sm:text-center mb-3'>Purchases: {customerData.purchases?.length}</h3>
                    {customerData.purchases ?
                        customerData.purchases.map((item: any, index: any) => {
                            return (
                                <Link key={index} to={`/details/sale/${item.id}`}>
                                    <StackableSalesCard productName={item.itemname} saleDate={item.saleDate}
                                                        quantity={item.quantity} phoneNumber={item.number}
                                                        totalPrice={item.totalPrice}
                                    />
                                </Link>

                            )
                        }) : null
                    }
                </div>
            </div>
        </>
    )
}

export default CustomerDetails
