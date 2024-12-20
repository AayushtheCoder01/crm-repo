import React from 'react'
import StackedProductCards from '@/components/StackedProductCards'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      <div className="w-full max-w-4xl">
        <StackedProductCards />
      </div>
    </main>
  )
}

