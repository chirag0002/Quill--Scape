import { BlogType } from "../hooks"
import { Avatar } from "./BlogCard"

export const BlogPage = ({ blog }: { blog: BlogType | null }) => {

    const date = (published_at: string) => {
        const date = new Date(published_at);
        const formattedDate = date.toDateString();

        return formattedDate;
    }

    if (!blog) {
        return <div>Loading...</div>
    }
    return <div className="flex justify-center px-10 w-full pt-200 max-w-screen-xl pt-12 m-auto">
        <div className="w-2/3">
            <div className="text-5xl font-extrabold">
                {blog.title}
            </div>
            <div className="text-slate-500 pt-2">
                {date(blog.published_at)}
            </div>
            <div className="pt-4">
                {blog.thumbnail && (
                    <img src={blog.thumbnail} alt="Blog Thumbnail" className="w-full h-auto" />
                )}
            </div>
            <div className="pt-4" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
        <div className="w-1/3">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full">
                <div className="pr-2 pl-2 flex flex-col justify-center">
                    <Avatar name={blog.author.name || "A"} size="big" />
                </div>
                <div>
                    <div className="text-xl font-bold">
                        {blog.author.name}
                    </div>
                    <div className="pt-2 text-slate-500">
                        This is the short description of the author, so people who reads the blog, can know about the author.
                    </div>
                </div>
            </div>
        </div>
    </div>
}