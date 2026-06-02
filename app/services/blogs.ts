const blogs = [
  {
    id: 1,
    title: "Изучаем Next.js",
    author: "Иван Иванов",
    url: "https://example.com",
    likes: 42
  },
  {
    id: 2,
    title: "Основы React",
    author: "Петр Петров",
    url: "https://example.com",
    likes: 1
  },
  {
    id: 3,
    title: "Основы",
    author: "Петров",
    url: "https://example.com",
    likes: 2
  },
  {
    id: 4,
    title: " React",
    author: "Петр ",
    url: "https://example.com",
    likes: 4
  }
];

let nextId = 5

export const getBlogs = () => {
  return blogs
}

export const getBlogById = (id: number) => {
  return blogs.find(blog => blog.id === id)
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 })
}

export const toggleLike = (id: number) => {
  const blog = blogs.find(note => note.id === id)
  if (blog) blog.likes += 1
}