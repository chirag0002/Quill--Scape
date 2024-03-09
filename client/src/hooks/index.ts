import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface BlogType {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published_at: string;
    author: {
        name: string;
    }
}

export const useBlogs = ({page}:{page:number }) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk?page=${page}`,{
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then(response => {
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    },[page])
    
    return {
        blogs,
        loading
    }
}

export const useBlog = ({id}: {id:string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogType | null>(null);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then(response => {
            setBlog(response.data.blog);
            setLoading(false);
        })
    },[id])
    
    return {
        blog,
        loading
    }
}

export const postBlog = () => {

}