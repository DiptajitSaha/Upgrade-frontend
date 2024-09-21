
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { VideoDropDown } from '../components/VideoDropdown';

export const Course = () => {
    const [course, setCourse] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            const res = await axios.get(`http://localhost:3000/courses/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.data.course != null) return res.data.data.course;
            else return {};
        }
        fetchCourse().then(res => {
            if (res.videos) res.videos.sort((a, b) => a.videoId - b.videoId);
            setCourse(res);
        });
    }, [id]);


    const buyHandler = async () => {
        try {
            const res = await axios.put(`http://localhost:3000/courses/buy/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(res.data);
            if (res.status < 400) {
                navigate('/mycourses');
            }
        }
        catch {
            alert('User not authenticated');
        }

    }

    return (
        <div className='p-4 grid gap-4'>
            <div className='mx-28 p-8 grid lg:grid-cols-2 gap-10 rounded-md'>
                <div>
                    <div className="text-stone-50 font-sans text-5xl font-bold items-center p-4">
                        {course.title}
                    </div>
                    <div className="text-gray-500 text-wrap py-6 text-xl font-bold font-serif">
                        {course.description}
                    </div>
                    {course.videos == null ? <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 px-12" onClick={buyHandler} >
                        <div>
                            <div> Enrole Now </div>
                            <div>
                                Price: ${course.price}
                            </div>
                        </div>
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                        : ""}

                </div>
                <div className=' flex justify-center items-center'>
                    <img src={course.thumbnailLink} />
                </div>
            </div>
            {
                course.videos == null ? " " :
                    <div className='mx-28 p-8 gap-10 flex justify-start border rounded-md'>
                        <div className='grid grid-cols-1 place-items-center gap-4 mt-4 items-center w-3/4'>
                            {course.videos.map(video => (
                                <VideoDropDown video={video.videoLink} key={video.videoId} index={video.videoId} />
                            ))
                            }

                        </div>
                    </div>

            }
        </div>
    );
};

export default Course;
