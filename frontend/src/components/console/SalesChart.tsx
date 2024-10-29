import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const SalesChart = ({sales}: {sales: any}) => {
    const data = sales

    // Function to format numbers in Indian style (with commas)
    const formatIndianNumber = (num) => {
        return num.toLocaleString('en-IN');
    };

    return (
        <Card className="w-full shadow-none border-white">
            <CardHeader>
                <CardTitle>Monthly Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="month"
                                tick={{ fill: '#666' }}
                            />
                            <YAxis
                                tick={{ fill: '#666' }}
                                tickFormatter={(value) => `₹${formatIndianNumber(value)}`}
                            />
                            <Tooltip
                                formatter={(value) => [`₹${formatIndianNumber(value)}`, 'Sales']}
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px'
                                }}
                            />
                            <Bar
                                dataKey="sales"
                                fill="#3b82f6"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default SalesChart;