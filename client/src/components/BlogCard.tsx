interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    thumbnail: string;
    published_at: string;
}


export const BlogCard = ({
    authorName,
    title,
    content,
    thumbnail,
    published_at,
}: BlogCardProps) => {

    const calculateReadingTime = (content: string): number => {
        const wordCount = content.split(/\s+/).length;
        const readingTime = wordCount / 200;
        return Math.ceil(readingTime);
    };
    const readingTime = calculateReadingTime(content);


    return <div>
        <div className="flex">
            <div className="flex justify-center flex-col"><Avatar name={authorName} /></div>
            <div className="font-fat">{authorName}</div>.
            <div className="font-thin text-slate-600">{published_at}</div>
        </div>
        <div>
            {title}
        </div>
        <div>
            {content.slice(0, 100) + "..."}
        </div>
        <div>
            {readingTime} min
        </div>
        <div>
            <img src={thumbnail} alt="" />
        </div>
        <div className="bg-slate-200 h-1 w-full"></div>
    </div>

}

function Avatar({name}:{name:string}) {
    return <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-xs text-gray-600 dark:text-gray-300">
            {name[0]}
        </span>
    </div>
}