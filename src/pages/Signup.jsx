import { useState } from "react";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import TextBox from "../components/TextBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BottomWarning from "../components/BottomWarning";
// import { useRecoilState } from "recoil";
// import { userInfo } from "../utils/user";

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const res = await axios.post("http://localhost:3000/user/signup", {
                userDetails: {
                    firstName,
                    lastName,
                    email,
                    password
                }
            });

            if (res.status < 400) {
                console.log(res.data);
                localStorage.setItem('token', res.data.data.token);
                navigate("/account");
            }
        } catch (e) {
            console.error(e);
        }
    };
    // console.log(user);

    return (
        <div className="h-screen w-screen flex justify-center items-center z-0">
            <div className="h-auto max-w-96 py-8 px-6rounded-lg flex flex-col flex-grow justify-evenly gap-6 shadow-gray-600 shadow-2xl rounded-md">
                <div className="flex flex-col justify-evenly gap-2">
                    <div className="flex justify-center">
                        <Header text={"Sign Up"} />
                    </div>
                    <div className="flex justify-center text-center">
                        <SubHeader text={"Enter Your information to create an account"} />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <TextBox title={"First Name"} placeholder={"john"} setState={setFirstName} type={"name"} />
                    <TextBox title={"Last Name"} placeholder={"doe"} setState={setLastName} type={"name"} />
                    <TextBox title={"Email"} placeholder={"john@doe.com"} setState={setEmail} type={"email"} />
                    <TextBox title={"Password"} placeholder={"•••••••••"} setState={setPassword} type={"password"} />
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-zinc-700 text-white rounded-lg p-2 w-80 transition-all hover:bg-slate-900"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                </div>
                <div className="flex justify-center text-white">
                    <BottomWarning text={"Already have an account?"} buttonText={"Log In"} to={"/login"} />
                </div>
            </div>
        </div>
    );
}