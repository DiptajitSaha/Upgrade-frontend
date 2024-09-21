import { useState } from "react";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import TextBox from "../components/TextBox";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [flag, setFlag] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const loginHandler = async () => {
        try{
            const userDetails = {
                email: email,
                password: password
              };
            const user = await axios.post('http://localhost:3000/user/login', {
                userDetails,
            });
            localStorage.setItem('token', user.data.data.token);
            navigate('/account');
        }
        catch{
            setFlag(true);
        }
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className=" max-w-96 py-8 px-6 bg-inherit flex flex-col flex-grow justify-evenly gap-6  shadow-gray-600 shadow-2xl rounded-md">
            <div className="flex flex-col justify-evenly gap-2">
                <div className="flex justify-center">
                    <Header text={"Sign In"} />
                </div>
                <div className="flex justify-center text-center">
                    <SubHeader text={"Enter Your Credentials to access your account"} />
                </div>
            </div>
            <div className="flex flex-col items-center gap-3">
                <TextBox title={"Email"} placeholder={"john@doe.com"} setState={setEmail} type="email"/>
                <TextBox title={"Password"} placeholder={"•••••••••"} setState={setPassword} type={"password"}/>
            </div>
            <div className="flex justify-center">
                <button className="bg-zinc-700 text-white rounded-lg p-2 w-80
                    /2 transition-all hover:bg-slate-900"
                    onClick={loginHandler}>Sign In</button>
            </div>
            { flag ? 
                <div className="text-red-400 text-center">
                    something wend wrong
                </div> : ""
            }
            <div className="flex justify-center text-white">
                <BottomWarning text={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}/>
            </div>
        </div>
        </div>
    )
}