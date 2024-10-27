import axios from "axios";

const Backend_URL = import.meta.env.VITE_BACKEND_URL
export async function getProductFn() {

    try {
        const products = await axios.get(`${Backend_URL}/api/v1/product/get`,
            {
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            }
        )

        return products
    } catch (error) {
        console.log("error", error)
    }
}

export async function createProductFn({productDetails}: {productDetails: any}) {
console.log(productDetails)
    try {
        const product = await axios.post(`${Backend_URL}/api/v1/product/create`,
            {
                name: productDetails.name,
                productId: productDetails.productId,
                description: productDetails.description,
                quantity: Number(productDetails.quantity),
                purchasePrice: Number(productDetails.purchasePrice),
                brand: productDetails.brand
            },
            {
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            }
        )

        return product
    } catch (error) {
        console.log("error", error)
    }
}