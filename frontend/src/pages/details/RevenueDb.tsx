import {useRecoilValue} from "recoil";
import {SalesAtom} from "../../store/store.ts";
import {useEffect, useState} from "react";
import {getMonthlySalesArr} from "../../functions/console.ts";
import SalesChart from "../../components/console/SalesChart.tsx";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Card, CardContent, CardHeader, CardTitle} from "../../components/ui/card.tsx";

function RevenueDashboard() {
    const sales:any = useRecoilValue(SalesAtom)
    const [monthlySales, setMonthlySales]: any = useState([])

    const month = new Date().getMonth()
    useEffect(() => {
        setMonthlySales(getMonthlySalesArr(sales))
    }, []);
    return <>
        <div>
            <div>
                <Card className={'mb-4'}>
                    <CardHeader>
                        <CardTitle className={'text-start'}>Revenue this Month</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl text-start font-bold">
                        ${monthlySales[month]?.sales}
                    </CardContent>
                </Card>

                <Card className={"mb-10"}>
                    <CardHeader>
                        <CardTitle className={'text-start'}>Previous Month revenue</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl text-start font-bold">
                        ${monthlySales[month-1]?.sales}
                    </CardContent>
                </Card>
            </div>

            </div>

            <div>
                <SalesChart sales={monthlySales}/>
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
        ;
        }

        export default RevenueDashboard