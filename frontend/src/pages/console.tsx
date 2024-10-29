import {useRecoilValue} from "recoil";
import {CustomerAtom, pageLoading, ProductsAtom, SalesAtom} from "../store/store.ts";
import {useEffect, useState} from "react";
import {ColorfulSalesDashboard} from "../components/colorful-sales-dashboard.tsx";
import {
    getMonthlySalesArr,
    getToatlProducts, getTotalCustomers,
    getTotalMonthlySales,
    getTotalRevenueThisMonth
} from "../functions/console.ts";
import SpinnyWrapper from "spinny-loader/wrapper";
import {WavyBars} from "spinny-loader";

function Console() {
    // states
    const sales = useRecoilValue(SalesAtom)
    const products = useRecoilValue(ProductsAtom)
    const customers = useRecoilValue(CustomerAtom)
    const isLoading = useRecoilValue(pageLoading);

    const [monthlySales, setMonthlySales] = useState([]) // state for monthly sales with month and sales in an array
    const [totalMonthlySales, setTotalMonthlySales]: any = useState({})
    const [monthlyRevenue, setMonthlyRevenue]: any = useState({})
    const [totalProducts, setTotalProducts]: any = useState()
    const [totalCustomers, setTotalCustomers]: any = useState({})

    useEffect(() => {
        if(sales.length > 0) {
            setMonthlySales(getMonthlySalesArr(sales))
            setTotalMonthlySales(getTotalMonthlySales(sales))
            setMonthlyRevenue(getTotalRevenueThisMonth(monthlySales))
            setTotalProducts(getToatlProducts(products))
            setTotalCustomers(getTotalCustomers(customers))
        }
    }, [sales]);

    return (
        <div>
            {
                isLoading? <SpinnyWrapper backgroundEffect={true}><WavyBars></WavyBars></SpinnyWrapper>: null
            }
            <ColorfulSalesDashboard
                sales={monthlySales}
                totalMonthlySales={totalMonthlySales.totalMonthlySales}
                salesGrowth={totalMonthlySales.salesGrowth}
                monthlyRevenue={monthlyRevenue.revenue}
                revenueGrowth={monthlyRevenue.revenueGrowth}
                totalProducts={totalProducts}
                totalCustomers={totalCustomers.totalCustomers}
                thisMonthCustomers={totalCustomers.newCustomers}
                customerGrowth={totalCustomers.customerGrowth}
            />
        </div>
    )
}

export default Console