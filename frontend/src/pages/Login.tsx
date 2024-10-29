import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Label } from '@radix-ui/react-label'
import { Input } from '../components/ui/input'
import { Signin } from '../functions/auth'
import { Button } from '../components/ui/button'

function Login() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: ""
})

const navigate = useNavigate()

async function getUserToken() {
  const user = await Signin({email: userInput.email, password: userInput.password})
        console.log(user)
        if(user.data.success === true) {
            localStorage.setItem("Authorization", user.data.jwt)
            window.location.reload()
            navigate("/dashboard")
        }
}
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="bg-white h-auto p-3 border-2 border-zinc-200 w-[55vw] mb-20 rounded-lg">

            <div className="flex items-start p-2 flex-col mb-4">
                <h3 className="text-3xl font-semibold">SignIn</h3>
                <Label className="text-zinc-400 mt-2">Sign in with your credentials</Label>
            </div>

            {/* email */}
            <div className="flex flex-col items-start p-2 mb-3">
                <Label className="text-md">Email</Label>
                <Input onChange={(e) => setUserInput({...userInput, email: e.target.value})} className="mt-2" placeholder="Enter your email"></Input>
            </div>

            {/* password */}
            <div className="flex flex-col items-start p-2 mb-3">
                <Label className="text-md">Password</Label>
                <Input onChange={(e) => setUserInput({...userInput, password: e.target.value})} className="mt-2"  placeholder="Enter your password"></Input>
            </div>

            <div className="flex justify-center p-2 mb-3">
                <Button onClick={getUserToken}>Sign In</Button>
            </div>
        </div>
    </div>
  )
}

export default Login