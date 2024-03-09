import { useState } from "react";
import { Apppbar } from "../components/Appbar";
import { Editor } from "../components/Editor";

const Publish = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('Start writing...');
    const [imageLink, setImageLink] = useState('');

    const values = {
        title,
        description,
        imageLink
    }

    return <div>
        <Apppbar type="publish" values={values} />
        <div className="flex justify-center flex-col bg-gray-100">
            <div className="w-11/12  bg-white  mt-8 rounded-lg m-auto">
                <div className="flex items-center">
                    <div className="text-slate-300 font-thin text-7xl rounded-full border px-4 ml-3">+</div>
                    <div className="h-14 m-5 border"></div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 focus:outline-none border-b-2 border-transparent focus:border-gray-400 text-5xl"
                    />
                </div>
                <input
                    type="text"
                    placeholder="Image Link"
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                    className="w-full py-2 px-4 mb-4 focus:outline-none border-b-2 border-transparent focus:border-gray-400"
                />
                <div className="flex justify-center items-center ml-8 mb-4">
                    {imageLink && (
                        <img src={imageLink} alt="Blog" className="max-h-80 max-w-80 rounded-lg shadow-lg" />
                    )}
                </div>
                <Editor description={description} setDescription={setDescription} />
            </div>
        </div>
    </div>
}

export default Publish
