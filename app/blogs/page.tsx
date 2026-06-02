import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = async ({ searchParams }: { searchParams: Promise<{ filter?: string}>} ) => {
  const {filter = ""} = await searchParams
  let blogs = (await getBlogs()).toSorted((a, b) => b.likes - a.likes)
  if (filter) blogs = blogs.filter(blog => blog.title.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Blogs</h2>
      <form action="/blogs" method="GET">
        <input type="text" name="filter" placeholder="Search..." defaultValue={filter}/>
        <button type="submit">Search</button>
      </form>
      {filter && (<Link href="/blogs">Сбросить</Link>)}
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs