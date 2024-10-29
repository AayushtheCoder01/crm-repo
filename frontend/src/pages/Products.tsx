import { StackableProductCard } from "../components/stackable-product-card"
// import { getProductFn } from "../functions/product"
import {useRecoilState, useRecoilValue } from "recoil"
import {pageLoading, ProductsAtom, userDataAtom} from "../store/store"
import {WavyBars} from "spinny-loader";
import {useState} from "react";
import {AddNewProductComponent} from "../components/add-new-product.tsx";
import {Button} from "../components/ui/button.tsx";

function Products() {
    const isLoading = useRecoilValue(pageLoading)
    const userData = useRecoilValue(userDataAtom)
    const [newProduct, setNewProduct] = useState(false)
    const [productsAtom, setAtom] = useRecoilState(ProductsAtom)

    // async function getProducts() {
    //     const api = await getProductFn()
    //     setAtom(api?.data.products)
    // }

    if(isLoading === true) {
        return (
            <>
                <div className='w-full h-screen flex justify-center items-center'>
                    {
                        isLoading? <WavyBars></WavyBars>: null
                    }
                </div>
            </>
        )
    }
  return (
    <div>
        <div className='my-3 mb-7 mt-7'>
            {
                userData.id? <Button onClick={() => setNewProduct(!newProduct)} className='text-center'>New Product</Button>: null
            }

            {
                newProduct? <AddNewProductComponent/>: null
            }
        </div>

        {
            productsAtom.map((product:any, index: any) => (
               <StackableProductCard key={index} itemId={product.productId} productName={product.name} quantity={product.quantity} purchasePrice={product.purchasePrice} dateAdded={product.dateAdded}/>
            ))
        }
    </div>
  )
}

export default Products