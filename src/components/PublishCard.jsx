import axios from "axios"
import { useState } from "react";
import { Link } from "react-router-dom"

export const PublishCard = ({ id, title, description, price, thumbnail, published }) => {
    const publishHandler = async () => {
        try{
            await axios.put(`https://upgrade-backend.vercel.app/courses/publish/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            window.location.reload();
        }
        catch(e) {
            console.log(e);
        }
    }
    return (
        <div className="flex flex-col gap-2">
            <Link to={`/courses/${id}`} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max hover:bg-gray-100 dark:border-gray-700 dark:bg-zinc-700 dark:hover:bg-gray-700">
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={thumbnail} alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {title}
                    </h5>
                    <hr className="w-full"/>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 py-4">
                        {description.substring(0, 170) + "..."}
                    </p>
                    <p className="mb-3 text-lg font-mono text-gray-700 dark:text-gray-200">
                        {price? "Price: $" + price : ""}
                    </p>
                </div>
            </Link>
                {!published ? <button className="bg-blue-500 py-3 rounded-md hover:bg-blue-800" onClick={publishHandler}>
                    publish now!
                </button > : "" }

        </div>


    )
}