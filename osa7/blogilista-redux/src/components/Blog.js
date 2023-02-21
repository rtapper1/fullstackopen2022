import { useState } from 'react'
import { useDispatch } from 'react-redux'
import getUser from '../utils/helperFunctions'
import PropTypes from 'prop-types'
import { removeBlog, likeBlog } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const [fullInfo, setFullInfo] = useState(false)
  const dispatch = useDispatch()

  const toggleFullInfo = () => {
    setFullInfo(!fullInfo)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
    }
  }

  return (
    <div className="blog">
      <div className="compact-blog" style={{ display: fullInfo ? 'none' : '' }}>
        {blog.title} {blog.author}{' '}
        <button className="full-info-button" onClick={toggleFullInfo}>
          view
        </button>
      </div>
      <div className="long-blog" style={{ display: fullInfo ? '' : 'none' }}>
        {blog.title} {blog.author}{' '}
        <button className="hide-info-button" onClick={toggleFullInfo}>
          hide
        </button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes}{' '}
        <button
          className="like-button"
          onClick={() => dispatch(likeBlog(blog))}
        >
          like
        </button>
        <br />
        {blog.user.name} <br />
        {blog.user.username === getUser().username && (
          <button className="delete-button" onClick={handleDelete}>
            remove
          </button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
