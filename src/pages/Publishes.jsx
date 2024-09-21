import axios from "axios";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import { useNavigate } from "react-router-dom";
import { CourseCard } from "../components/CourseCard";
import Header from "../components/Header";

const Publishes = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        axios.get('http://localhost:3000/courses/publishes', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => setCourses(res.data.data.courses));
    }, []);

    return (
        localStorage.getItem('token') == null ? <NotFound /> :
            <div className='mx-32 my-10 text-white'>
                <button className="p-4 border rounded-lg flex justify-between w-full cursor-pointer hover:bg-indigo-950 transition-all" onClick={() => {
                    navigate('/publishes/upload');
                }}>
                    <div className="grid grid-cols-1 gap-4 content-between" >
                        <div className="text-2xl p-6">
                            Create new course now!
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center p-4">
                        <svg fill="#ffffff" height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xmlSpace="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_27_" d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255 s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0 c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"></path> </g></svg>
                    </div>
                </button>
                <div className="pt-10">
                    <Header text={'Your published courses are here...'} />
                </div>
                <div className='my-3 p-4 bg-slate-300 rounded-lg h-max'>
                    {
                        courses.map(course => (
                            <div key={course._id} className='p-2'>
                                <CourseCard key={course._id} id={course._id} title={course.title} description={course.description} thumbnail={course.thumbnailLink} />
                            </div>

                        ))
                    }
                </div>
            </div>
    );
}
export default Publishes;