import { useState } from 'react';
import { Avatar } from './BlogCard';
import { useNavigate } from 'react-router-dom';

export const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const name = localStorage.getItem('name');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/signin');
    };

    const handleMyBlogs = () => {
        navigate("/blogs")
    };

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)}>
                {
                    name ? (
                        <>
                            <Avatar name={name} size="big" />
                        </>
                    ) : (
                        <>
                        </>
                    )
                }
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                    <ul className="py-2">
                        <li>
                            <button onClick={handleMyBlogs} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Blogs</button>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}