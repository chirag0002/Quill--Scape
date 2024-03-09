import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from './BlogCard';
import { useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export const Apppbar = ({ type, values }: { 
    type: "create" | "publish", 
    values?: {
        title:string, 
        description:string, 
        imageLink:string
    } }) => {

    const navigate = useNavigate();

    async function publish () {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                title:values?.title,
                content:values?.description,
                thumbnail:values?.imageLink
            },{
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }
            )
            alert(response.data.message)
            navigate(`/blog/${response.data.id}`)
    };

    return <div className="border-b flex justify-between px-10 py-4">
        <Link to="/blogs" className="cursor-pointerflex flex justify-center flex-col font-extrabold text-xl">
            Medium
        </Link>
        <div className='flex items-center justify-center'>
            {type === "create" ? (
                <>
                    <Link to="/publish">
                        <button className="text-white bg-green-700 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-3">
                            Create New Blog
                        </button>
                    </Link>
                </>
            ) : (
                <>
                    <button  onClick={publish} className="text-white bg-green-700 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-3">
                        Publish
                    </button>
                </>
            )}
            <div>
                <Avatar name='Chirag' size="big" />
            </div>
        </div>
    </div>
}