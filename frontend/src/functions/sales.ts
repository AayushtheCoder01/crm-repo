import axios from "axios"

const Backend_URL = import.meta.env.VITE_BACKEND_URL
export async function getSalesFn() {
    try {
        const sales = await axios.get(`${Backend_URL}/api/v1/sale/get`, {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
            },
        })
        return sales
    } catch (error) {
        console.log("error", error)
    }
}
