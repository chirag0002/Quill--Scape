import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

export const Editor = ({ description, setDescription }: { description: string, setDescription: (newDescription: string) => void }) => {

    const modules ={
        toolbar: [
            ['bold', 'italic', 'underline','strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{'script':'sub' }, {'script':'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ]
    }

    return <div className="h-screen w-full">
        <ReactQuill
            theme="snow"
            value={description}
            onChange={(e) => setDescription(e)}
            className="h-screen w-full"
            modules={modules}
        />
    </div>
}