import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    thumbnail: string;
    published_at: string;
    id: number;
}


export const BlogCard = ({
    authorName,
    title,
    content,
    thumbnail,
    // published_at,
    id
}: BlogCardProps) => {

    const calculateReadingTime = (content: string): number => {
        const wordCount = content.split(/\s+/).length;
        const readingTime = wordCount / 200;
        return Math.ceil(readingTime);
    };
    const readingTime = calculateReadingTime(content);

    return <Link to={`/blog/${id}`}>
        <div className="flex w-5/6 justify-center m-auto border-b border-slate-200 cursor-pointer">
            <div className="w-3/4 pt-6 pb-2 p-8">
                <div className="flex">
                    <div className="flex justify-center flex-col text-sm md:text-lg">
                        <Avatar name={authorName} size="small" />
                    </div>
                    <div className="font-extralight pl2 text-sm md:text-base">
                        {authorName}
                    </div>
                    <div className="flex justify-center flex-col pl-2 pr-2">
                        <Circle />
                    </div>
                    <div className="font-thin text-slate-600 pl2 text-sm md:text-base">
                        {/* {published_at} */}
                    </div>
                </div>
                <div className="text-xl md:text-2xl font-semibold mt-4 mb-2">
                    {title}
                </div>
                <div className="text-md font-thin mb-2 hidden md:block ">
                <TruncateHTMLContent content={content} maxLength={200} />
                </div>
                <div className="text-slate-500 text-xs md:text-sm font-thin">
                    {readingTime} min read
                </div>
            </div>
            <div className="w-1/4 flex justify-center flex-col m-auto">
                <img className="w-4/4 md:w-3/4 lg:w-2/4 m-auto" src={thumbnail} alt="" />
            </div>
        </div>
    </Link>
}

function TruncateHTMLContent({content, maxLength}:{content:string, maxLength:number}): JSX.Element {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = content;
    let textContent = tempElement.textContent || tempElement.innerText || '';
    if (textContent.length > maxLength) {
        textContent = textContent.slice(0, maxLength) + '...';
    }
    return <>{textContent}</>;
}   

function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({ name, size="small" }: { name: string, size:"small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-1 ${size==="small" ? "w-4 h-4 md:w-5 md:h-5" : "w-8 h-8 md:w-9 md:h-9"}`}>
        <span className={`${size==="small" ? "text-xs" : "text-md"} text-gray-600 dark:text-gray-300 `}>
            {name[0]}
        </span>
    </div>
}