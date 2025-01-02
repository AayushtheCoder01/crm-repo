import {useRecoilValue} from "recoil";
import {CustomerDetailsAtom, SalesAtom} from "../../store/store.ts";
import {useEffect, useState} from "react";
import {getMonthlySalesArr, getTotalMonthlySales, getTotalRevenueThisMonth} from "../../functions/console.ts";
import SalesChart from "../../components/console/SalesChart.tsx";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {Card, CardContent, CardHeader, CardTitle} from "../../components/ui/card.tsx";
import {getRevenueByCategory} from "./revenue.ts";

function paymentSorter(obj:any) {
    let paymentMethodsArr = []
    for(let paymentMode in obj) {
        if(!obj.revenueByAllCategories) {
            paymentMethodsArr.push({
                paymentMode: paymentMode,
                amount: obj[paymentMode]
            })
        }
    }

    return paymentMethodsArr
}

function RevenueDashboard() {
    const sales:any = useRecoilValue(SalesAtom)
    const customerDetails: any = useRecoilValue(CustomerDetailsAtom)
    const [monthlySales, setMonthlySales]: any = useState([])
    const [thisMonthRev, setThisMonthRev]: any = useState({})
    const [numberOfSales, setNumberOfSales]: any = useState({})

    const [revByCategory, setRevByCategory]: any = useState({})
    const [paymentMethods, setPaymentMethods]: any = useState([])
    const month = new Date().getMonth()

    useEffect(() => {
        setMonthlySales(getMonthlySalesArr(sales))
        setNumberOfSales(getTotalMonthlySales(sales))
        setRevByCategory(getRevenueByCategory({sales: sales, month: new Date().getMonth() + 1}))
        // payment modes sorter
    }, []);

    useEffect(() => {
        setThisMonthRev(getTotalRevenueThisMonth(monthlySales))
        setPaymentMethods(paymentSorter(revByCategory.paymentModes))
    }, [monthlySales]);

    return <>
        <div>
            <div>
                <Card className={'mb-4'}>
                    <CardHeader>
                        <CardTitle className={'text-start'}>Revenue this Month</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl text-start font-bold text-green-600">
                        ${thisMonthRev?.revenue ?? 0}
                    </CardContent>
                </Card>

                <div className="flex h-auto w-full">
                    <div className="w-full mr-5">
                        <Card
                            className={"mb-10 hover:scale-105 transform transition-transform duration-300 ease-in-out"}>
                            <CardHeader>
                                <CardTitle className={'text-start'}>Previous Month Revenue</CardTitle>
                            </CardHeader>
                            <CardContent className="text-2xl text-start font-bold hover:text-blue-500">
                                ${monthlySales[month - 1]?.sales}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="w-full">
                        <Card
                            className={"mb-10 hover:scale-105 transform transition-transform duration-300 ease-in-out"}>
                            <CardHeader>
                                <CardTitle className={'text-start'}>Monthly Revenue Growth</CardTitle>
                            </CardHeader>
                            <CardContent className="text-2xl text-start font-bold">
                                {thisMonthRev?.revenueGrowth || 0}
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </div>

        </div>

        <div>
            <SalesChart sales={monthlySales}/>
        </div>

        <div className="flex h-auto w-full mt-10">
            <div className="w-full mr-5">
                <Card className={"mb-10 hover:scale-105 transform transition-transform duration-300 ease-in-out"}>
                    <CardHeader>
                        <CardTitle className={'text-start'}>Total Sales this Month</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl text-start font-bold hover:text-blue-500">
                        {numberOfSales?.totalMonthlySales ?? 0} sales
                    </CardContent>
                </Card>
            </div>

            <div className="w-full">
                <Card className={"mb-10 hover:scale-105 transform transition-transform duration-300 ease-in-out"}>
                    <CardHeader>
                        <CardTitle className={'text-start'}>Avg sale value this Month</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl text-start font-bold hover:text-blue-500">
                        {(thisMonthRev?.revenue / numberOfSales?.totalMonthlySales).toFixed(0) || 0}
                    </CardContent>
                </Card>
            </div>
        </div>

        <div className="w-full mr-5">
            <Card className={"mb-10 hover:scale-105 transform transition-transform duration-300 ease-in-out"}>
                <CardHeader>
                    <CardTitle className={'text-start'}>New Customers this Month</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl text-start font-bold hover:text-blue-500">
                    {customerDetails?.newCustomers ?? 0} Customers
                </CardContent>
            </Card>
        </div>

        <div className="h-[30rem] my-10 w-full flex flex-col md:flex-row justify-center">
            <div className="w-full h-[30rem] flex flex-col md:w-8/12 border-2 rounded-xl mr-4 mb-2">
                <p className="text-center mt-1">Revenue by Category</p>
            <ResponsiveContainer className={"dark:text-black"} width="100%" height="100%">
                <BarChart data={revByCategory.revenueByAllCategories} margin={{top: 20, right: 30, left: 40, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="category"/>
                    <YAxis
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Bar
                        dataKey="revenue"
                        fill="#4f46e5"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
            </div>

            <div className="flex flex-col w-full md:w-4/12 border-2 rounded-xl p-3 pl-7 py-2 no-scrollbar overflow-y-scroll overflow-hidden customScroll">
                <p className="text-center my-1">Payment Methods</p>
                {paymentMethods.map((method:any, index:any) => {
                    return <div key={index} className="my-2 border-2 rounded-md h-[17vh] flex flex-col justify-center items-start">
                        <div className="p-3 text-3xl font-bold">
                            {method.paymentMode}
                        </div>

                        <div className="p-4 text-lg">
                            {method.amount}
                        </div>
                    </div>
                    }
                )}
            </div>
        </div>

        <div className='h-96 w-full'>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={monthlySales}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="month" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="sales" stroke="#82ca9d"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    </>

}

export default RevenueDashboard