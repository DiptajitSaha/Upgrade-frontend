import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { CourseCard } from "../components/CourseCard";

export const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    let temp = [];
    axios.get('http://localhost:3000/courses/mycourses', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      temp = (res.data.data.courses.map(i => {
        return { _id: i._id, title: i.title, description: i.description, thumbnailLink: i.thumbnailLink, author: i.author }
      }))
      console.log(temp);
      setCourses(temp);
    })
  }, []);

  return (
    <div className='h-dvh'>
      <div className='mx-32 my-10 flex flex-col gap-3'>
        <Header text={'We have all your courses here...'} />
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
    </div>
  );
};

export default MyCourses;
