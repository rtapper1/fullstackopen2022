import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({blog, onUpdate, setNotification}) => {
  const [fullInfo, setFullInfo] = useState(false)
  
  const toggleFullInfo = () => {
    setFullInfo(!fullInfo)
  }

  const handleLike = () => {
    blogService.likeBlog(blog)
      .then(res => {
        blog.likes = blog.likes + 1
        return blogService.getAll()
      })
      .then(res => {
        onUpdate(res)
      })
      .catch(err => {
        console.log(`Something went wrong with like: ${err}`)
      })
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      blogService.deleteBlog(blog)
        .then(res => blogService.getAll())
        .then(res => onUpdate(res))
        .catch(err => {
          console.log('Something went wrong while deleting', err)
          setNotification({
            error: true,
            message: `Something went wrong while deleting ${blog.title} by ${blog.author}. Is this your blog to delete?`
          })
        })
    }
  }

  return (
  <>
    <div className='blog' style={{display: fullInfo ? 'none' : ''}}>
      {blog.title} {blog.author} <button onClick={toggleFullInfo}>view</button>
    </div>
    <div className='blog' style={{display: fullInfo ? '' : 'none'}}>
      {blog.title} {blog.author} <button onClick={toggleFullInfo}>hide</button><br/>
      {blog.url}<br/>
      likes {blog.likes} <button onClick={handleLike}>like</button><br/>
      {blog.user.name} <br/>
      <button className='deleteButton' onClick={handleDelete}>remove</button>
    </div>
  </>
  )
}

export default Blog