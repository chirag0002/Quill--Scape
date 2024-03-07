import { Apppbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <Apppbar type="create" />
      </div>
      <div>
        {
          blogs.map(blog => {
            return <div key={blog.id}>
              <BlogCard
                authorName={blog.author.name}
                title={blog.title}
                content={blog.content}
                published_at="3rd December 2014"
                thumbnail={blog.thumbnail}
                id={blog.id}
              />
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Blogs