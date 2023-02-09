import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Input from './components/Input'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(undefined)

  useEffect(() => {
    setTimeout(() => {
      console.log('Notification deleted')
      setNotification(undefined)
    }, 5000)
  }, [notification])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}/>
      <Login setNotification={setNotification}/>
      <Input onBlogAdd={setBlogs} setNotification={setNotification}/>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            onUpdate={setBlogs}
            setNotification={setNotification}/>
        )}
    </div>
  )
}

export default App