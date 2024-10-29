const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatDate(dateString) {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${month}/${year}`;
}

function formatDatePrevMonth(dateString) {
    const date = new Date(dateString);
    const month = (date.getMonth()).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${month}/${year}`;
}

export function getMonthlySalesArr(sales: any) {
    let monthlySales: any = []
    let arr: any = []
    let numformonthname = 0
    // eslint-disable-next-line for-direction
    for (let i = 1; i < 13; i++) {
        const monthlySalesObj = {month: "", sales: 0,}
        const monthName = monthNames[numformonthname]
        const filteredSales = sales.filter((item: any) => (item.month == i))
        if (filteredSales.length === 0) {
            monthlySalesObj.month = monthName
            monthlySalesObj.sales = 0
            arr.push(monthlySalesObj)
            numformonthname++
        }
        if(filteredSales.length > 0) {
            monthlySalesObj.month = monthName
            monthlySalesObj.sales = filteredSales.reduce((acc: number, item: any) => acc + item.totalPrice, 0)
            arr.push(monthlySalesObj)
            numformonthname++
        }
    }
    monthlySales = []
    monthlySales = arr
    return monthlySales
}

export function getTopProducts(products: any) {
    let sliceLength = products.length
    if(products.length > 5) {
        sliceLength = 5
    }
    const topProducts = products.sort((a: any, b: any) => b.quantity - a.quantity).slice(0, sliceLength)
    return topProducts
}

export function getTotalMonthlySales(sales: any) {
    const month = new Date().getMonth() + 1
    const totalMonthlySales = sales.filter((sale) => (sale.month == month))
    const prevMonthSales = sales.filter((sale) => (sale.month == month - 1))

    const percentageIncrease = ((totalMonthlySales.length - prevMonthSales.length) / prevMonthSales.length) * 100;
    const salesGrowthPercentage = `${percentageIncrease.toFixed(2)}%`;

    return {
        totalMonthlySales: totalMonthlySales.length,
        salesGrowth: salesGrowthPercentage
    }
}

export function getTotalRevenueThisMonth(monthlySales: any) {
    const month = new Date().getMonth()
    const totalMonthlySales = monthlySales.filter((sale) => (sale.month == monthNames[month]))

    const prevMonthSales = monthlySales.filter((sale) => (sale.month == monthNames[month - 1]))
    const revenueGrowth = ((totalMonthlySales[0]?.sales - prevMonthSales[0]?.sales) / prevMonthSales[0]?.sales) * 100
    return {
        revenue: totalMonthlySales[0]?.sales,
        revenueGrowth: `${revenueGrowth.toFixed(2)}%`
    }
}

export function getToatlProducts(products: any) {
    const totalProducts = products.length
    return totalProducts
}

export function getTotalCustomers(customers: any) {
    const date = new Date()
    const formatedDate = formatDate(date)
    const prevMonthFormatedDate = formatDatePrevMonth(date)

    const totalCustomers = customers.length
    const newCustomersMonthly = customers.filter((customer: any) => {
        const createdAt = formatDate(customer.createdAt)
        return createdAt == formatedDate
    });

    const prevMonthCustomers = customers.filter((customer: any) => {
        const createdAt = formatDate(customer.createdAt)
        return createdAt == prevMonthFormatedDate
    })
    if(prevMonthCustomers.length === 0) {
        prevMonthCustomers.push(1)
    }
    const customerGrowth = ((newCustomersMonthly.length - prevMonthCustomers?.length) / prevMonthCustomers?.length  ) * 100
    return {
        totalCustomers: totalCustomers,
        newCustomers: newCustomersMonthly.length,
        customerGrowth: `${customerGrowth.toFixed(2)}%`
    }
}