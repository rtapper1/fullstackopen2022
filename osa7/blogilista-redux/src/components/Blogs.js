import { useSelector } from 'react-redux'

import Blog from './Blog'
import Input from './Input'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  return (
    <>
      <Input />
      <div className="blogs">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    </>
  )
}

export default Blogs
