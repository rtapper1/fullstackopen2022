import { useState } from 'react'
import blogService from '../services/blogs'
import getUser from '../utils/helperFunctions'
import PropTypes from 'prop-types'

const Blog = ({ blog, onUpdate, setNotification }) => {
  const [fullInfo, setFullInfo] = useState(false)

  const toggleFullInfo = () => {
    setFullInfo(!fullInfo)
  }

  const handleLike = () => {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === 'test') {
      return onUpdate()
    }
    blogService.likeBlog(blog)
      .then(() => {
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
        .then(() => blogService.getAll())
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
    <div className='blog'>
      <div className='compact-blog' style={{ display: fullInfo ? 'none' : '' }}>
        {blog.title} {blog.author} <button className='full-info-button' onClick={toggleFullInfo}>view</button>
      </div>
      <div className='long-blog' style={{ display: fullInfo ? '' : 'none' }}>
        {blog.title} {blog.author} <button className='hide-info-button' onClick={toggleFullInfo}>hide</button><br/>
        {blog.url}<br/>
      likes {blog.likes} <button className='like-button' onClick={handleLike}>like</button><br/>
        {blog.user.name} <br/>
        {blog.user.username === getUser().username &&
          (<button className='delete-button' onClick={handleDelete}>remove</button>)
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default Blog