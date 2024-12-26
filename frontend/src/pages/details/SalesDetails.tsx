// import UserSaleInfo from "../../components/UserSaleInfo.tsx";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import UserSaleInfo from "../../components/UserSaleInfo.tsx";
import {useRecoilState} from "recoil";
import {pageLoading} from "../../store/store.ts";
import SpinnyWrapper from "spinny-loader/wrapper";
import { WavyBars } from "spinny-loader";
import ProductCardWide from "../../components/ProductCardWide.tsx";

function SalesDetails() {
    const {id} = useParams()
    const [saleDetails, setSaleDetails]: any = useState({})
    const [saleItems, setSaleItems]: any = useState([])
    const [isLoading, setIsLoading] = useRecoilState(pageLoading)

    const navigate = useNavigate()
    async function getSalesFn() {
        setIsLoading(true)
        try {
            const sale = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/sale/get/${id}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("Authorization")
                    }
                }
            )

            setSaleDetails(sale.data.sales)
            setSaleItems(sale.data.sales.items)
            setIsLoading(false)

        } catch (error) {
            console.log("error", error)
            setIsLoading(false)
            navigate('/dashboard/sales')
        }
    }
    useEffect(() => {
        getSalesFn()
    }, [])
    if(isLoading) {
        return <div>
            <SpinnyWrapper backgroundEffect={false}><WavyBars></WavyBars></SpinnyWrapper>
        </div>
    }

        return <>
            <div>
                <div className="mb-10">
                    <UserSaleInfo saleInfo={{
                        id: saleDetails.id,
                        itemname: saleDetails.itemname,
                        number: saleDetails.number,
                        category: saleDetails.category,
                        paymentMethod: saleDetails.paymentMethod,
                        quantity: saleDetails.quantity,
                        saleDate: saleDetails.saleDate,
                        totalPrice: saleDetails.totalPrice
                    }}/>
                </div>
                
                <div className=''>
                    {
                        saleItems.map((item: any, index: any)=>{
                            return(
                                <div key={index} className='mb-5'>
                                    <ProductCardWide productName={item.productname} price={item.price} quantity={item.quantity}/>
                            </div>
                        )
                        })
                    }
                </div>
            </div>
        </>
    }

export default SalesDetails