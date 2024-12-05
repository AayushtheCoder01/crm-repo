import { CustomerCard } from '../components/customer-card'
import {useRecoilValue} from 'recoil'
import {CustomerAtom, pageLoading, userDataAtom} from '../store/store'
import {Button} from "../components/ui/button.tsx";
import {useState} from "react";
import {CreateCustomerFormComponent} from "../components/create-customer-form.tsx";
import {WavyBars} from "spinny-loader";
import { ListFilter } from 'lucide-react';
import {Input} from "../components/ui/input.tsx";
import { Search } from 'lucide-react';

function Customer() {
    const customerAtom = useRecoilValue(CustomerAtom)
    const userData = useRecoilValue(userDataAtom)
    const isLoading = useRecoilValue(pageLoading)

    const [addCustomer, setAddCustomer] = useState(false)

    const [customers, setCustomers] = useState(customerAtom)
    //states
    // async function getCustomer()  {
    //     const api = await getCustomerFn()
    //     setAtom(api?.data.customer)
    // }

    if(isLoading === true) {
        return (
            <>
                <div className='w-full h-screen flex justify-center items-center'>
                    {
                        userData? <WavyBars></WavyBars>: null
                    }
                </div>
            </>
        )
    }

    function filterCustomers(e: any) {

        const filteredCustomers = customerAtom.filter((customer: any) => {
            return customer.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                customer.number.toString().includes(e.target.value) ||
                customer.email.toLowerCase().includes(e.target.value.toLowerCase())
        })

        setCustomers(filteredCustomers)
    }
    return (
    <div>
        <div className='my-3 mb-7 mt-7'>

            {
                userData.id?
                    <div className='flex'>
                        {/*<div className='flex justify-center w-full'>*/}
                        {/*</div>*/}

                        <div className='mr-4 flex'>
                            <Input onChange={(e: any) => filterCustomers(e)} placeholder='e.g.  name, email, number' className='border-2 rounded-full w-[15rem]'></Input>
                            <Search className='mt-2 ml-2 mr-2'/>
                        </div>

                        <div className='flex'>
                            <Button className='bg-transparent text-black border-2 dark:text-white hover:bg-black hover:text-white'>Filter <ListFilter/></Button>
                        </div>

                        <div className='flex justify-end w-full ml-5'>
                            <Button onClick={() => setAddCustomer(!addCustomer)} className='text-center'>New Customer</Button>
                        </div>
                    </div> : null
            }
            {
                addCustomer? <CreateCustomerFormComponent/>: null
            }

        </div>

        {customers?.map((customer: any, key: any) => (
            <CustomerCard key={key} name={customer.name} tpv={customer.tpv} email={customer.email} phoneNumber={customer.number} customerSince={customer.createdAt} city={customer.city}/>
        ))}
    </div>
  )
} 

export default Customer