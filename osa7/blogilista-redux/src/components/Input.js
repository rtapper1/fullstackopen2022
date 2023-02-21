import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

const Input = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createBlog(title, author, url))
    setTitle('')
    setAuthor('')
    setUrl('')
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
          <div>
            title{' '}
            <input
              type="text"
              id="title-input"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author{' '}
            <input
              type="text"
              id="author-input"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url{' '}
            <input
              type="text"
              id="url-input"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <div>
            <input type="submit" id="blog-add-button" value="create" />
          </div>
        </form>
        <button onClick={toggleVisible}>cancel</button>
      </div>
      <div style={{ display: isVisible ? 'none' : '' }}>
        <button id="new-note-button" onClick={toggleVisible}>
          new note
        </button>
      </div>
    </>
  )
}

export default Input
