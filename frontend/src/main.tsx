import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Layout from './Layout.tsx'
import Signup from './pages/Signup.tsx'
import { RecoilRoot } from 'recoil'
import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Console from "./pages/console.tsx";
import SettingsPage from "./pages/Settings.tsx";
import DetailsPage from "./pages/details/Details.tsx";
import CustomerDetails from "./pages/details/CustomerDeatails.tsx";
import SalesDetails from "./pages/details/SalesDetails.tsx";
import RevenueDashboard from "./pages/details/RevenueDb.tsx";
const SalesPage = lazy(() => import('./pages/SalesPage.tsx'))
const Customer = lazy(() => import('./pages/Customer.tsx'))
const Products = lazy(() => import('./pages/Products.tsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <App />
      },
      {
        path: "signup",
        element: <Signup/>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "dashboard/sales",
        element: <Suspense fallback={<div></div>}><Dashboard><SalesPage/></Dashboard></Suspense>
      },
      {
        path: "dashboard/products",
        element: <Suspense fallback={<div></div>}><Dashboard><Products/></Dashboard></Suspense>
      },
      {
        path: "dashboard/customers",
        element: <Suspense fallback={<div></div>}><Dashboard><Customer/></Dashboard></Suspense>
      },
      {
        path: "dashboard/console",
        element: <Dashboard><Console/></Dashboard> ,
      },
      {
        path: "dashboard/settings",
        element: <Dashboard><SettingsPage/></Dashboard> ,
      },
      {
        path: "details/customer/:number",
        element: <DetailsPage><CustomerDetails/></DetailsPage> ,
      },
      {
        path: "details/sale/:id",
        element: <DetailsPage><SalesDetails/></DetailsPage> ,
      },{
        path: "dashboard/revenue",
        element: <DetailsPage><RevenueDashboard/></DetailsPage>,
      },{
        path: "dashboard/profits",
        element: <DetailsPage><RevenueDashboard/></DetailsPage> ,
      },
      {
        path: "dashboard",
        element: <Dashboard children={""}/>
      }
    ]
  }
])
//comment added
createRoot(document.getElementById('root')!).render(
    <RecoilRoot>
      <RouterProvider router={router}/>
    </RecoilRoot>
)
