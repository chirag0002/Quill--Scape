import { useEffect, useState } from "react";
import { Apppbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogType, useMyBlogs } from "../hooks"
import { PageSkeleton } from "../components/Skeletons";

const MyBlogs = () => {
  const [page, setPage] = useState(1);
  const [documents, setDocuments] = useState<BlogType[]>([]);

  const { loading, blogs } = useMyBlogs({ page });

  useEffect(() => {
    if (!loading && blogs.length > 0) {
      setDocuments(prevDocuments => {
        const existingBlogIds = prevDocuments.map(blog => blog.id);
        const uniqueNewBlogs = blogs.filter(blog => !existingBlogIds.includes(blog.id));
        return [...prevDocuments, ...uniqueNewBlogs];
      });
    }
  }, [blogs]);

  useEffect(() => {
    function onscroll() {
      const scrolledTo = window.scrollY + window.innerHeight;
      if (Math.abs(document.body.scrollHeight - scrolledTo) <= 10) {
        setPage(prevPage => prevPage + 1);
      }
    };

    let timeout: number;

    function throttleScroll() {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        onscroll();
      }, 500);

    }
    window.addEventListener("scroll", throttleScroll);
    return () => {
      window.removeEventListener("scroll", throttleScroll);
    };
  }, []);

  if (loading) {
    return <div>
      <Apppbar type="create" />
      <div>
        <PageSkeleton />
        <PageSkeleton />
        <PageSkeleton />
        <PageSkeleton />
      </div>
    </div>
  }

  return (
    <div>
      <div>
        <Apppbar type="create" />
      </div>
      <div>
        {
          documents.map(document => {
            return <div key={document.id}>
              <BlogCard
                authorName={document.author.name}
                title={document.title}
                content={document.content}
                published_at={document.published_at}
                thumbnail={document.thumbnail}
                id={document.id}
              />
            </div>
          })
        }
      </div>
    </div>
  )
}

export default MyBlogs