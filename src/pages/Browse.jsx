
import axios from 'axios';
import { CourseCard } from '../components/CourseCard';
import Header from '../components/Header';
import { useEffect, useState } from 'react';

export const Browse = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    let temp = [];
    axios.get('https://upgrade-backend.vercel.app/courses/browse').then((res) => {
      temp = (res.data.data.courses.map(i => {
        return { _id: i._id, title: i.title, description: i.description, price: i.price, thumbnailLink: i.thumbnailLink, author: i.author }
      }))
      setCourses(temp);
    })
  }, []);

  return (
    <div className='h-dvh'>
      <div className='mx-32 my-10 flex flex-col gap-3'>
        <Header text={'Browse Courses'} />
        <div className="sub-header text-slate-200 font-mono"> Your Search End Here........</div>
        <div className='my-3 p-4 bg-slate-300 rounded-lg h-max'>
          {
            courses.map(course => (
              <div key={course._id} className='p-2'> 
                <CourseCard key={course._id} id={course._id} title={course.title} description={course.description} thumbnail={course.thumbnailLink} price={course.price} />
              </div>
              
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Browse;
