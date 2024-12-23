import axios from "axios";


const Backend_URL = import.meta.env.VITE_BACKEND_URL
export async function getCustomerFn() {
    
    try {
        const customers = await axios.get(`${Backend_URL}/api/v1/customer/get`,
            {
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            }
        )
    
        return customers
    } catch (error) {
        console.log("error", error)
    }
}

export async function createCustomerFn({customerDetails}: {customerDetails: any}) {
console.log(customerDetails)
    try {
        const customer = await axios.post(`${Backend_URL}/api/v1/customer/create`,
            {
              customername: customerDetails.customername,
              number: Number(customerDetails.number),
              email: customerDetails.email,
              address: customerDetails.address,
              city: customerDetails.city
            },
            {
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            }
        )

        return customer
    } catch (error) {
        console.log("error", error)
    }
}

export async function deleteCustomerFn({number}: {number: number}) {
    try {
        const customer = await axios.delete(`${Backend_URL}/api/v1/customer/delete/${number}`, {
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        })
        return customer
    } catch (error) {
        console.log("error", error)
    }

}