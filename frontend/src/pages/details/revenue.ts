export function getRevenueByCategory({sales, month}: {sales: any, month: number}){
    const revenueByAllCategories: any = []
    const revenueByCategory: any = {}
    const paymentModes: any = {}

    sales = sales.filter((sale: any) => (sale.month == month))

    sales.map((sale: any) => {
        if(paymentModes[sale.paymentmethod]) {
            paymentModes[sale.paymentmethod] += sale.totalPrice
        } else {
            paymentModes[sale.paymentmethod] = sale.totalPrice
        }

        if(revenueByCategory[sale.category]){
            revenueByCategory[sale.category] += sale.totalPrice
        }
        else{
            revenueByCategory[sale.category] = sale.totalPrice
        }
    })
    for(let key in revenueByCategory){
        revenueByAllCategories.push({
            "category": key || "Uncategorized",
            revenue: revenueByCategory[key]
        })
    }

    return {revenueByAllCategories, paymentModes}
}