import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { signup } from "../functions/auth"
import { useNavigate } from "react-router-dom"
import {useRecoilState} from "recoil";
import {pageLoading} from "../store/store";
import SpinnyWrapper from "spinny-loader/wrapper";
import {WavyBars} from "spinny-loader";

function Signup() {
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const [loding, setLoding] = useRecoilState(pageLoading)

    async function createNewUser() {
        setLoding(true)
        const user = await signup({email: userInput.email, password: userInput.password, name: userInput.name})
        if(user.data.success === true) {
            localStorage.setItem("Authorization", user.data.jwt)
            setLoding(false)
            window.location.reload()
            navigate("/dashboard")
        } else {
            setLoding(false)
        }
    }

    if (loding) {
        return (
            <SpinnyWrapper><WavyBars/></SpinnyWrapper>
        )
    }

  return (
    <div className="flex justify-center items-center h-screen">
        <div className="bg-white h-auto p-3 border-2 dark:border-zinc-600 dark:bg-black border-zinc-200 w-[55vw] mb-20 rounded-lg">

            <div className="flex items-start p-2 flex-col mb-4">
                <h3 className="text-3xl font-semibold">SignUp</h3>
                <Label className="text-zinc-400 mt-2">Create a new account to get started.</Label>
            </div>

            {/* name */}
            <div className="flex flex-col items-start p-2 mb-3">
                <Label className="text-md">Name</Label>
                <Input onChange={(e) => setUserInput({...userInput, name: e.target.value})} className="mt-2"  placeholder="Enter your name"></Input>
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
                <Button onClick={createNewUser}>Sign Up</Button>
            </div>
        </div>
    </div>
  )
}

export default Signup