import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { toggleBlogLike } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{id: string}> }) => {
  const { id } = await params
  console.log("ID:", id); 
  const blog = await getBlogById(+id)
  if (!blog) {
    return notFound()
  }
  return (
    <div>
      <h2>{blog.author}</h2>
      <p>{blog.title}</p>
      <p>owner blog: {blog.userId}</p>
      <a href={blog.url} target="_blank"rel="noopener noreferrer">{blog.url}</a>
      <p>{blog.likes}</p>
      <form action={toggleBlogLike}>
        <input type="hidden" name="id" value={blog.id.toString()} />
        <button type="submit">Like</button>
      </form>
    </div>
  )
}

export default BlogPage