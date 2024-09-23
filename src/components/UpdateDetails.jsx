import { useSetRecoilState } from "recoil"
import { userInfo } from "../utils/user"
import Header from "./Header";
import TextBox from "./TextBox";
import { useState } from "react";
import axios from "axios";

const UpdateDetails = ({editHandler}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const updateHandler = async () => {
        try{
            const update = {};
            if(firstName != "") {
                update.firstName = firstName;
            }
            if(lastName != "") {
                update.lastName = lastName;
            }
            if(password != "") {
                update.password = password;
            }
            if(newPassword != "") {
                update.newPassword = newPassword;
            }

            const res = await axios.put("https://upgrade-backend.vercel.app/user/update", {
                update
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = res.data.data;
            localStorage.setItem('token', data.token);
            alert('user details updated successfully!');
            editHandler();
        }
        catch(e) {
            console.log(e.message);
        }
    }

    return (
        <div>
            <div className="h-auto max-w-96 py-8 px-6 rounded-lg flex flex-col flex-grow justify-evenly gap-6 shadow-2xl">
                <div className="flex flex-col justify-evenly gap-2">
                    <div className="flex justify-center">
                        <Header text={"Update Form"} />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <TextBox title={"First Name"} setState={setFirstName} type={"name"} />
                    <TextBox title={"Last Name"} setState={setLastName} type={"name"} />
                    <TextBox title={"Password"} setState={setPassword} type={"password"} />
                    <TextBox title={"New Password"} setState={setNewPassword} type={"password"} />
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-slate-800 text-white rounded-lg p-2 w-80 transition-all hover:bg-slate-900"
                        onClick={updateHandler}
                    >
                        Update Details
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateDetails;