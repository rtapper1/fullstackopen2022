import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { likeBlog } from '../reducers/blogsReducer'
import { removeBlog } from '../reducers/blogsReducer'

const BlogPage = () => {
  const { id } = useParams()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  if (blogs.length === 0) {
    return undefined
  }
  const blog = blogs.find((b) => b.id === id)

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
      navigate('/')
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes{' '}
        <button
          className="like-button"
          onClick={() => dispatch(likeBlog(blog))}
        >
          like
        </button>
        <div>added by {blog.user.name}</div>
        {user && user.username === blog.user.username ? (
          <div>
            <button className="delete-button" onClick={handleDelete}>
              delete
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default BlogPage
