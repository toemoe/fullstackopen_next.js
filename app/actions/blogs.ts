"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, toggleLike } from "../services/blogs"

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  addBlog(title, author, url)
  revalidatePath("/blogs")
  redirect("/blogs")
}

export const toggleBlogLike = async (formData: FormData) => {
  const id = +formData.get("id")!
  toggleLike(id)
  revalidatePath(`/blogs/${id}`)
  redirect("/blogs")
}
