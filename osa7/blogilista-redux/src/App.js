import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import Login from './components/Login'
import BlogPage from './components/BlogPage'
import Notification from './components/Notification'
import { initUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'
import Navigation from './components/Navigation'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
    dispatch(initUsers())
  }, [dispatch])

  return (
    <>
      <Navigation />
      <div id="main-view">
        <h2>blogs</h2>
        <Notification />
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  )
}

export default App
