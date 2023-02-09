import { useState } from 'react'
import blogService from '../services/blogs'

const Input = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === 'test') {
      return props.onBlogAdd({
        title,
        author,
        url
      })
    }
    blogService.createBlog({
      title,
      author,
      url
    })
      .then(res => {
        props.setNotification({
          error: false,
          message: `A new blog ${res.title} by ${res.author} added`
        })
        return blogService.getAll()
      })
      .then(res => {
        props.onBlogAdd(res)
      })
      .catch(err => {
        console.log('Creating new blog failed:', err)
        props.setNotification({
          error: true,
          message: 'Adding a new blog failed. Are you logged in?'
        })
      })
      .finally(() => {
        setTitle('')
        setAuthor('')
        setUrl('')
      })
    console.log('Submitted!')
  }

  const toggleVisible = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      <div style={{ display: isVisible ? '' : 'none' }}>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <div>title <input type='text' id='title-input' value={title} onChange={({ target }) => setTitle(target.value)}/></div>
          <div>author <input type='text' id='author-input' value={author} onChange={({ target }) => setAuthor(target.value)}/></div>
          <div>url <input type='text' id='url-input' value={url} onChange={({ target }) => setUrl(target.value)}/></div>
          <div><input type='submit' value='create'/></div>
        </form>
        <button onClick={toggleVisible}>cancel</button>
      </div>
      <div style={{ display: isVisible ? 'none' : '' }}>
        <button onClick={toggleVisible}>new note</button>
      </div>
    </>
  )
}

export default Input