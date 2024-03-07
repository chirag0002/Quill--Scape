import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { BlogPage } from "../components/BlogPage";
import { Apppbar } from "../components/Appbar";

const Blog = () => {
  const {id} = useParams();
  const {loading, blog} = useBlog({id: id || ""});

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Apppbar type="create" />
      <BlogPage blog={blog} />
    </div>
  )
}

export default Blog