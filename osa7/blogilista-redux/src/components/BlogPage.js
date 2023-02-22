import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { likeBlog, removeBlog, commentBlog } from '../reducers/blogsReducer'

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
      </div>
      <div>added by {blog.user.name}</div>
      {user && user.username === blog.user.username ? (
        <div>
          <button className="delete-button" onClick={handleDelete}>
            delete
          </button>
        </div>
      ) : null}
      <h3>comments</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          dispatch(commentBlog(blog, event.target.comment.value))
          event.target.comment.value = ''
        }}
      >
        <input name="comment" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogPage
