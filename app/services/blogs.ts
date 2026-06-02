import { eq } from "drizzle-orm"
import { db } from "../db"
import { blogs } from "../../db/schema"


export const getBlogs = async () => {
  console.log("db", db)
  console.log("query", db.query)

  return db.query.blogs.findMany()
}

export const getBlogById = (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id)
  })
}

export const addBlog = async (title: string, author: string, url: string) => {
  await db.insert(blogs).values({
    title, author, url, likes: 0
  })
}

export const toggleLike = async (id: number) => {
  const blog = await getBlogById(id)
  if (!blog) throw new Error("Blog not found")
  await db.update(blogs).set({ likes: (blog.likes ?? 0) + 1 }).where(eq(blogs.id, id));
}
