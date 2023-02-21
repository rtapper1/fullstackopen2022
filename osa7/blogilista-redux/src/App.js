import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Login from './components/Login'
import Input from './components/Input'
import Notification from './components/Notification'
import { initUser } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  return (
    <div id="main-view">
      <h2>blogs</h2>
      <Notification />
      <Login />
      <Input />
      <div className="blogs">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    </div>
  )
}

export default App
