import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const FormSignup = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [postInputs, setPostInputs] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    })

    async function sendRequest() {
        try {
            setIsLoading(true);
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                name: postInputs.name,
                email: postInputs.email,
                username: postInputs.username,
                password: postInputs.password
            })

            localStorage.setItem('token',  response.data.jwt);
            localStorage.setItem('name', response.data.user);

            alert(response.data.message)

            navigate('/')
        } catch (e) {
            console.log(e);
            alert(e)
        } finally{
            setIsLoading(false);
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
                {isLoading ? (
                        <div role="status" className="flex justify-center flex-col w-8 m-auto" >
                            <svg aria-hidden="true" className=" w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    ): "Sign Up" }
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