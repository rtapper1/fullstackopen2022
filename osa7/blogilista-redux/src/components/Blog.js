import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <div className="compact-blog">
        <Link to={`blogs/${blog.id}`}>
          {blog.title} {blog.author}{' '}
        </Link>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
