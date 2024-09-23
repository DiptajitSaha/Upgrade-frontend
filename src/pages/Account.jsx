
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userInfo } from "../utils/user";
import UpdateDetails from "../components/UpdateDetails";
import NotFound from "./NotFound";

const Account = () => {

    const [popUp, setPopUp] = useState(false);
    const [user, setUser] = useRecoilState(userInfo);

    const editHandler = () => {
        setPopUp(!popUp);
    }
    useEffect(() => {
        try{
            async function fetchData() {
                return await axios.get("https://upgrade-backend.vercel.app/user/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            }
            fetchData().then((res) => {
                const {id, email, firstName, lastName, purchasedCourse} = res.data.data.user;
                console.log({id, email, firstName, lastName, purchasedCourse});
                
                setUser({
                    id,
                    email,
                    firstName,
                    lastName,
                    purchasedCourse
                });
                
            });
        }
        catch(e) {
            console.log(e);
        }
        
    }, [setUser])

    const firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.substring(1, user.firstName.length);
    const lastName = user.lastName.charAt(0).toUpperCase() + user.lastName.substring(1, user.lastName.length);

    return (
        localStorage.getItem('token') == null ? <NotFound /> :
        <div className="h-dvh">
            <div className="flex flex-wrap justify-center py-10">
            <div className="w-5/6 p-10 bg-slate-200 rounded-lg shadow-slate-500">
                <div className='flex justify-between flex-wrap my-6 mx-10'>
                    <div className="flex flex-col justify-center">
                        <div className="text-slate-600 px-4">
                            User Information
                        </div>
                        <div className="text-slate-900 font-semibold text-5xl ">
                            {firstName + " " + lastName}
                        </div>
                    </div>
                    <div className="h-48 w-48 rounded-full overflow-hidden flex justify-center items-center">
                        <img src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' alt="profile" />
                    </div>
                </div>
                <div className="flex gap-10 my-6 mx-10 flex-wrap">
                    <div className="text-slate-900 font-semibold text-xl">
                        <div>
                            Email
                        </div>
                        <div>
                            PurchasedCourse
                        </div>
                        <div>
                            Password
                        </div>
                    </div>
                    <div className="text-slate-600 font-mono text-xl">
                        <div>
                            {user.email}
                        </div>
                        <div>
                            {user.purchasedCourse.length}
                        </div>
                        <div>
                            ••••••••••••
                        </div>
                    </div>
                </div>
                <div className="my-6 mx-10 flex gap-5 flex-wrap">
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex gap-2 shadow-lg" onClick={editHandler}>
                        <div>
                            Edit details
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0,-20,256,256">
                            <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(10.66667,10.66667)"><path d="M18.41406,2c-0.25587,0 -0.51203,0.09747 -0.70703,0.29297l-1.70703,1.70703l4,4l1.70703,-1.70703c0.391,-0.391 0.391,-1.02406 0,-1.41406l-2.58594,-2.58594c-0.1955,-0.1955 -0.45116,-0.29297 -0.70703,-0.29297zM14.5,5.5l-11.5,11.5v4h4l11.5,-11.5z"></path></g></g>
                        </svg>
                    </button>
                </div>
            </div >
            </div>
            {popUp ?
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                    <UpdateDetails editHandler={editHandler}/>
                </div> : ""
            }
        </div>
    );
}
export default Account;