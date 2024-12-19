import {useEffect, useState} from 'react'
import { LuLogOut } from "react-icons/lu";
import { Switch } from "../components/ui/switch.tsx"
import {Link, NavLink, useNavigate} from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { CustomerAtom, pageLoading, ProductsAtom, SalesAtom, userDataAtom } from '../store/store'
import { authlogin } from '../functions/auth';
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';
import {Separator} from "./ui/separator.tsx";

function Header() {
    const [theme, setTheme] = useState(false)
    const isLogin = useRecoilValue(userDataAtom)
    const setLoading = useSetRecoilState(pageLoading)

    const navigate = useNavigate()
    const userData = useSetRecoilState(userDataAtom)

    const updateCustomerAtom = useSetRecoilState(CustomerAtom)
    const updateSalesAtom = useSetRecoilState(SalesAtom)
    const updateProductsAtom = useSetRecoilState(ProductsAtom)

        async function login() {
            // const navigate = useNavigate()
            setLoading(true)
            try {
                const user: any = await authlogin({Authorization: localStorage.getItem("Authorization"), updateCustomerAtom: updateCustomerAtom, updateSalesAtom: updateSalesAtom, updateProductsAtom: updateProductsAtom})
                if(user.data.success === true) {
                  userData({email: user.data.user.email, name: user.data.user.name, id: user.data.user.id})
                  navigate("/dashboard/console")
                } 
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }
        useEffect(()=> {
            checkTheme()
            login()
        }, [])

    function changeTheme() {
        if(theme === false) {
            setTheme(true)
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            setTheme(false)
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }
    function checkTheme() {
        if(localStorage.getItem("theme") === "dark") {
            setTheme(true)
            document.documentElement.classList.add("dark")
        }
    }

    function logout() {
        localStorage.clear()
        navigate("/")
        window.location.reload()
    }
  return (
    <header className="fixed border-b-2 px-5 flex justify-between top-0 dark:text-white left-0 right-0 z-10 bg-opacity-10 bg-white bg-transparent dark:bg-black backdrop-filter backdrop-blur-md p-2">
    <div className='flex justify-center w-2/12 items-center p-1'>
         <h1 className='text-2xl md:text-3xl cursor-pointer font-bold font-mono tracking-widest'>CRM</h1>
    </div>

    <div className='flex justify-center items-center pr-2'>

        {
            isLogin.id? 
            <div className='flex'>
                <Link to={"/dashboard/console"}>
                    <p className='mx-2 font-bold'>Dashboard</p>
                </Link>
                <div className='mr-4 flex'>
                    <Link to={"dashboard/console"}>
                        <p className='mx-2 hidden sm:inline'>Console</p>
                    </Link>

                    <Link to={"dashboard/sales"}>
                        <p className='mx-2 hidden sm:inline'>Sales</p>
                    </Link>

                    <Link to={"/dashboard/products"}>
                        <p className='mx-2 hidden sm:inline'>Products</p>
                    </Link>

                    <Link to={"/dashboard/customers"}>
                        <p className='hidden sm:inline'>Customers</p>
                    </Link>
                </div>
            </div>
             : null
        }

        <Separator orientation='vertical' className='mx-2 mr-6'/>

        <div className='mr-4'>
            <div className='flex '>
                <Switch checked={theme} onClick={() => changeTheme()} className='mr-2 mt-1'/>
                {
                    theme? <Moon /> : <Sun />
                }
            </div>
        </div>
         {isLogin.id? <p onClick={logout} className='mx-2 ml-3 cursor-pointer'><LuLogOut color='red' size="1.4rem"/></p>: <div>
             <NavLink to={"/login"} className={`px-2`}>
             <a className="mx-2">
                     SignIn
             </a>
         </NavLink>

             <NavLink to={"/signup"}>
             <a className=" bg-purple-600 p-2 rounded text-white ">
                     SignUp
             </a>
             </NavLink>

         </div>}

            
    </div>
 </header>
  )
}

export default Header