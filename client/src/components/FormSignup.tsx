import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const FormSignup = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                name: postInputs.name,
                email: postInputs.email,
                username: postInputs.username,
                password: postInputs.password
            })
            const token = response.data.jwt;
            localStorage.setItem('token', token);

            alert(response.data.message)

            navigate('/blogs')
        } catch (e) {
            console.log(e);
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="text-3xl font-extrabold w-96 text-center">
                    Get Started
                </div>
                <div className="text-slate-400 text-center mb-5">

                    Already have an account?
                    <Link className="pl-2 underline" to={"/signin"}>SignIn</Link>

                </div>
                <div className="flex justify-center flex-col">
                    <LabeledInput label="Name" placeholder="Peter Parker" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} />

                    <LabeledInput label="Email" placeholder="abc@xyz.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />

                    <LabeledInput label="Username" placeholder="spiderman" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }} />

                    <LabeledInput label="Password" placeholder="*******" type="password" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                </div>
                <button onClick={sendRequest} type="button" className="text-white bg-[#050708] font-medium rounded-lg text-md px-5 py-2.5 items-center me-2 mb-2 w-96">
                    Sign Up
                </button>
            </div>

        </div>
    </div>
};

interface LabeledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabeledInput({ label, placeholder, onChange, type }: LabeledInputType) {
    return <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">{label}</label>
        <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder={placeholder} required />
    </div>
}