export function getRevenueByCategory(sales: any){
    const revenueByAllCategories: any = []
    const revenueByCategory: any = {}
    sales.map((sale: any) => {
        if(revenueByCategory[sale.category]){
            revenueByCategory[sale.category] += sale.totalPrice
        }
        else{
            revenueByCategory[sale.category] = sale.totalPrice
        }
    })

    for(let key in revenueByCategory){
        console.log(key)
        revenueByAllCategories.push({
            "category": key || "Uncategorized",
            revenue: revenueByCategory[key]
        })
    }

    return {revenueByAllCategories}
}