import { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [videos, setVideos] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    const attachVideoHandler = (video) => {
        setVideos((arr) => {
            arr.push(video);
            return arr;
        })
    }

    const uploadHandler = () => {
        try {
            if (videos.length == 0) throw new Error('No videos attached');
            if (thumbnail === null) throw new Error('Upload thumbnail');
            if (title === '' || description === '' || price === 0) throw new Error('Incomplete data!')

            const formData = new FormData();
            videos.forEach(video => {
                formData.append('videos', video);
            });
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('thumbnail', thumbnail);

            setUploadMessage('uploading...');

            axios.post('http://localhost:3000/courses/create', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                onUploadProgress: (event) => {
                    const percentCompleted = Math.round((event.loaded * 100) / event.total);
                    setProgress(percentCompleted);
                }
            }).then((res) => {
                setUploadMessage(`Upload Successfull! re-directing in 3 seconds`);
                setTimeout(() => {
                    navigate('/publishes');
                }, 3*1000);
            });
        }
        catch (e) {
            console.log(e.message);
            alert(e.message);
        }
    }

    return (
        <div >
            <div className="mx-32 my-10 text-white bg-gray-900 rounded-lg h-full p-4">
                <div className='p-4 shadow-lg'>
                    <Header text={"Enter your course's informations"} />
                </div>
                <div className="text-box flex flex-col gap-2 text-gray-200 px-8 py-2">
                    <div className="text-bold font-sans font-bold text-xl"> Title </div>
                    <input type='input' id={title} placeholder='The title goes here....' className="px-3 py-2 outline outline-1 outline-slate-300 w-full bg-transparent rounded-sm" onChange={(event) => {
                        setTitle(event.target.value);
                    }} />
                </div>
                <div className="text-box flex flex-col gap-2 text-gray-200 px-8 py-2">
                    <div className="text-bold font-sans font-bold text-xl"> Description </div>
                    <textarea type='input' id={title} placeholder='Describe your course here....' className="px-3 py-2 outline outline-1 outline-slate-300 w-full h-40 bg-transparent rounded-sm" onChange={(event) => {
                        setDescription(event.target.value);
                    }} />
                </div>
                <div className="text-box flex flex-col gap-2 text-gray-200 px-8 py-2">
                    <div className="text-bold font-sans font-bold text-xl"> Price </div>
                    <div className='flex'>
                        <div className='text-xl py-2 px-4'> $ - </div>
                        <input type='input' id={title} placeholder='How much to charge?' className="px-3 py-2 outline outline-1 outline-slate-300 w-80 bg-transparent rounded-sm" onChange={(event) => {
                            setPrice(event.target.value);
                        }} />
                    </div>
                </div>

                <div className="flex justify-between text-gray-200 p-4 border m-8 rounded-sm">
                    <div className="text-bold font-sans font-bold text-xl"> Thumbnail : </div>
                    <div className='flex justify-around gap-4'>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setThumbnail(e.target.files[0])
                            }
                            className='cursor-pointer'
                        />
                    </div>
                </div>
                <div className="text-bold font-sans px-8 py-2 font-bold text-xl"> Videos ( Must provide atleast one video ) </div>
                <div className="gap-2 text-gray-200 border mx-8 rounded-sm font-bold">
                    <div className="flex justify-between text-gray-200 p-4 border m-8 rounded-sm">
                        <div className='flex justify-around gap-4'>
                            <div>
                                Video 1:
                            </div>
                            <input type='file' className='cursor-pointer' accept='video/*' onInput={(e) =>
                                attachVideoHandler(e.target.files[0])
                            } />
                        </div>
                    </div>
                    <div className="flex justify-between gap-2 text-gray-200 p-4 border m-8 rounded-sm">
                        <div className='flex justify-around gap-4'>
                            <div>
                                Video 2:
                            </div>
                            <input type='file' className='cursor-pointer' accept='video/*' onInput={(e) =>
                                attachVideoHandler(e.target.files[0])
                            } />
                        </div>
                    </div>
                    <div className="flex justify-between gap-2 text-gray-200 p-4 border m-8 rounded-sm">
                        <div className='flex justify-around gap-4'>
                            <div>
                                Video 3:
                            </div>
                            <input type='file' className='cursor-pointer' accept='video/*' onInput={(e) =>
                                attachVideoHandler(e.target.files[0])
                            } />
                        </div>
                    </div>
                    <div className="flex justify-between gap-2 text-gray-200 p-4 border m-8 rounded-sm">
                        <div className='flex justify-around gap-4'>
                            <div>
                                Video 4:
                            </div>
                            <input type='file' className='cursor-pointer' accept='video/*' onInput={(e) =>
                                attachVideoHandler(e.target.files[0])
                            } />
                        </div>
                    </div>
                    <div className="flex justify-between gap-2 text-gray-200 p-4 border m-8 rounded-sm">
                        <div className='flex justify-around gap-4'>
                            <div>
                                Video 5:
                            </div>
                            <input type='file' className='cursor-pointer' accept='video/*' onInput={(e) =>
                                attachVideoHandler(e.target.files[0])
                            } />
                        </div>
                    </div>
                    <div className="flex justify-between gap-2 text-gray-200 p-4 border m-8 rounded-sm">
                        <div className='flex justify-around gap-4'>
                            <div>
                                Video 6:
                            </div>
                            <input type='file' className='cursor-pointer' accept='video/*' onInput={(e) =>
                                attachVideoHandler(e.target.files[0])
                            } />
                        </div>
                    </div>
                    <div className="flex justify-between gap-2 text-gray-200 p-4 border m-8 rounded-sm">
                        <div className='flex justify-around gap-4'>
                            <div>
                                Video 7:
                            </div>
                            <input type='file' className='cursor-pointer' accept='video/*' onInput={(e) =>
                                attachVideoHandler(e.target.files[0])
                            } />
                        </div>
                    </div>
                    <div className="flex justify-between gap-2 text-gray-200 p-4 border m-8 rounded-sm">
                        <div className='flex justify-around gap-4'>
                            <div>
                                Video 8:
                            </div>
                            <input type='file' className='cursor-pointer' accept='video/*' onInput={(e) =>
                                attachVideoHandler(e.target.files[0])
                            } />
                        </div>
                    </div>
                    <div className="flex justify-between gap-2 text-gray-200 p-4 border m-8 rounded-sm">
                        <div className='flex justify-around gap-4'>
                            <div>
                                Video 9:
                            </div>
                            <input type='file' className='cursor-pointer' accept='video/*' onInput={(e) =>
                                attachVideoHandler(e.target.files[0])
                            } />
                        </div>
                    </div>
                    <div className="flex justify-between gap-2 text-gray-200 p-4 border m-8 rounded-sm">
                        <div className='flex justify-around gap-4'>
                            <div>
                                Video 10:
                            </div>
                            <input type='file' className='cursor-pointer' accept='video/*' onInput={(e) =>
                                attachVideoHandler(e.target.files[0])
                            } />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-2 text-slate-800 bg-white p-4 border m-8 rounded-sm hover:bg-gray-700 transition-all cursor-pointer hover:rounded-xl" onClick={() => uploadHandler()}>
                    <div className="flex justify-around gap-4 text-2xl font-extrabold">
                        {uploading ? "uploading..." : "upload"}
                    </div>
                </div>
                {
                    uploadMessage.length !== 0 ? <div className="flex justify-around gap-4 text-slate-200 p-4 border m-8 rounded-sm">
                        <div className="flex justify-around gap-4 text-2xl">
                            <div>
                                {uploadMessage}
                            </div>
                            <div className='flex flex-col justify-center'>
                                <progress value={progress} max={100} />
                            </div>
                        </div>
                    </div> : ""
                }

            </div>
        </div>
    )
}

export default Upload;