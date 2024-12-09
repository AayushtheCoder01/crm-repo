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
        path: "dashboard",
        element: <Dashboard children={""}/>
      }
    ]
  }
])
createRoot(document.getElementById('root')!).render(
    <RecoilRoot>
      <RouterProvider router={router}/>
    </RecoilRoot>
)
