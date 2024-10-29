import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ShoppingCart,TrendingUp, Box, Users, UserPlus } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import SalesChart from "./console/SalesChart.tsx";

// Mock data
const recentSales = [
  { id: 1, date: '2024-10-28', customer: 'John Doe', amount: 125.50, status: 'Completed' },
  { id: 2, date: '2024-10-27', customer: 'Jane Smith', amount: 200.00, status: 'Pending' },
  { id: 3, date: '2024-10-26', customer: 'Bob Johnson', amount: 75.25, status: 'Completed' },
  { id: 4, date: '2024-10-25', customer: 'Alice Brown', amount: 300.00, status: 'Completed' },
  { id: 5, date: '2024-10-24', customer: 'Charlie Davis', amount: 150.75, status: 'Pending' },
]

const topProducts = [
  { name: 'Product A', sales: 120, revenue: 12000 },
  { name: 'Product B', sales: 85, revenue: 8500 },
  { name: 'Product C', sales: 65, revenue: 6500 },
  { name: 'Product D', sales: 50, revenue: 5000 },
]

export function ColorfulSalesDashboard({sales, totalMonthlySales, salesGrowth, monthlyRevenue, revenueGrowth, totalProducts, totalCustomers, thisMonthCustomers, customerGrowth}: {sales: any, totalMonthlySales: number, salesGrowth: string, monthlyRevenue: number, revenueGrowth: string , totalProducts: number, totalCustomers: number, thisMonthCustomers: number, customerGrowth: string}) {
    const [dateRange, setDateRange] = useState({ start: '2024-10-01', end: '2024-10-28' })

  return (
    <div className="min-h-screen dark:bg-gray-900 p-1 md:p-3 rounded-xl transition-colors duration-200">
      <div className="w-[65vw] max-w-7xl mx-auto bg-white dark:bg-gray-900 p-5 md:p-6 rounded-lg transition-colors duration-200">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 md:mb-0">Console</h1>
          <div className="flex space-x-2">
            <Input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />
            <Input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />
            <Button variant="outline" className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600">
              Apply
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-100 dark:bg-blue-900 border-blue-200 dark:border-blue-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-100">Total Sales This Month</CardTitle>
              <ShoppingCart className="w-4 h-4 text-blue-600 dark:text-blue-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-50">{totalMonthlySales}</div>
              <p className="text-xs text-blue-700 dark:text-blue-200">{salesGrowth} up form last month</p>
            </CardContent>
          </Card>
          <Card className="bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-green-800 dark:text-green-100">Total Revenue This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900 dark:text-green-50" >₹ {monthlyRevenue}</div>
              <p className="text-xs text-green-700 dark:text-green-200">{revenueGrowth} up from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-pink-100 dark:bg-pink-900 border-pink-200 dark:border-pink-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-pink-800 dark:text-pink-100">Total Products</CardTitle>
              <Box className="w-4 h-4 text-pink-600 dark:text-pink-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-900 dark:text-pink-50">{totalProducts}</div>
              <p className="text-xs text-pink-700 dark:text-pink-200">products in your inventory</p>
            </CardContent>
          </Card>

          <Card className="bg-teal-100 dark:bg-teal-900 border-teal-200 dark:border-teal-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-teal-800 dark:text-teal-100">Total Customers</CardTitle>
              <Users className="w-4 h-4 text-teal-600 dark:text-teal-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-teal-900 dark:text-teal-50">{totalCustomers}</div>
              <p className="text-xs text-teal-700 dark:text-teal-200">Lifetime customers</p>
            </CardContent>
          </Card>

          <Card className="bg-indigo-100 dark:bg-indigo-900 border-indigo-200 dark:border-indigo-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-indigo-800 dark:text-indigo-100">New Customers This Month</CardTitle>
              <UserPlus className="w-4 h-4 text-indigo-600 dark:text-indigo-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-50">{thisMonthCustomers}</div>
              <p className="text-xs text-indigo-700 dark:text-indigo-200">{customerGrowth} from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-100 dark:bg-orange-900 border-orange-200 dark:border-orange-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-orange-800 dark:text-orange-100">Average Order Value</CardTitle>
              <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-50">104.46</div>
              <p className="text-xs text-orange-700 dark:text-orange-200">+2% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 overflow-x-scroll sm:overflow-hidden">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 w-[100vw] sm:w-auto">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">Sales Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-auto w-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                <SalesChart sales={sales} />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-600 dark:text-gray-300">Product</TableHead>
                    <TableHead className="text-right text-gray-600 dark:text-gray-300">Sales</TableHead>
                    <TableHead className="text-right text-gray-600 dark:text-gray-300">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product: any) => (
                    <TableRow key={product.name}>
                      <TableCell className="font-medium text-gray-800 dark:text-gray-200">{product.name}</TableCell>
                      <TableCell className="text-right text-gray-800 dark:text-gray-200">{product.quantity}</TableCell>
                      <TableCell className="text-right text-gray-800 dark:text-gray-200">{product.purchasePrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-600 dark:text-gray-300">Date</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Customer</TableHead>
                  <TableHead className="text-right text-gray-600 dark:text-gray-300">Amount</TableHead>
                  <TableHead className="text-right text-gray-600 dark:text-gray-300">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium text-gray-800 dark:text-gray-200">{sale.date}</TableCell>
                    <TableCell className="text-gray-800 dark:text-gray-200">{sale.customer}</TableCell>
                    <TableCell className="text-right text-gray-800 dark:text-gray-200">{sale.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right text-gray-800 dark:text-gray-200">{sale.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}