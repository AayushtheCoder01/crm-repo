import axios from "axios"

type signupProps = {
    email: string,
    password: string,
    name: string
}
const Backend_URL = import.meta.env.VITE_BACKEND_URL
export async function signup({email, password, name}: signupProps) {

    try {
        const user: any = await axios.post(`${Backend_URL}/api/v1/user/signup`, {
            username: email,
            password: password,
            name: name
        })
        return user
    } catch (error) {
        console.log("error", error)
    }
}

export async function Signin({email, password}: {email: string, password: string}) {
    try {
        const user: any = await axios.post(`${Backend_URL}/api/v1/user/signin`, {
            username: email,
            password: password,
        })

        return user
    } catch (error) {
        console.log("error", error)
    }
}

export async function authlogin({Authorization, updateCustomerAtom, updateSalesAtom, updateProductsAtom}: {Authorization: any, updateCustomerAtom?: any, updateSalesAtom?: any, updateProductsAtom?: any}) {
    
    try {
        const user = await axios.get(`${Backend_URL}/api/v1/user/tokenlogin`, {
            headers: {
                Authorization: Authorization
            }
        })
        updateCustomerAtom(user.data.user.customers.reverse())
        updateSalesAtom(user.data.user.sales.reverse())
        updateProductsAtom(user.data.user.products.reverse())
        // console.log(user.data)
        return user
    } catch (error) {
        console.log("error", error)
    }
}

export async function deleteAccount({userToken}: {userToken: any}) {
    try {
        const user: any = await axios.delete(`${Backend_URL}/api/v1/user/delete`, {
            headers: {
                Authorization: userToken
            }
        })
        return user
    } catch (error) {
        console.log("error", error)
    }
}