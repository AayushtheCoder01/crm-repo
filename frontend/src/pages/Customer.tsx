import { CustomerCard } from '../components/customer-card'
import {useRecoilValue} from 'recoil'
import {CustomerAtom, pageLoading, userDataAtom} from '../store/store'
import {Button} from "../components/ui/button.tsx";
import {useState} from "react";
import {CreateCustomerFormComponent} from "../components/create-customer-form.tsx";
import {WavyBars} from "spinny-loader";

function Customer() {
    const customerAtom = useRecoilValue(CustomerAtom)
    const userData = useRecoilValue(userDataAtom)
    const isLoading = useRecoilValue(pageLoading)

    const [addCustomer, setAddCustomer] = useState(false)

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
    return (
    <div>
        <div className='my-3 mb-7 mt-7'>
            {
                userData.id?
                    <div className='flex justify-center w-full'>
                        <Button onClick={() => setAddCustomer(!addCustomer)} className='text-center'>New Customer</Button>
                    </div> : null
            }
            {
                addCustomer? <CreateCustomerFormComponent/>: null
            }

        </div>

        {customerAtom?.map((customer: any, key: any) => (
        <CustomerCard key={key} name={customer.name} tpv={customer.tpv} email={customer.email} phoneNumber={customer.number} customerSince={customer.createdAt} city={customer.city}/>
        ))}
    </div>
  )
} 

export default Customer