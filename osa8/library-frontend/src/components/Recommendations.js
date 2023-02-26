import { useQuery, useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = ({ show, setPage }) => {
  const result = useQuery(ME)
  const [books, setBooks] = useState([])
  const [getBooks, booksQuery] = useLazyQuery(ALL_BOOKS, {
    onCompleted: (data) => setBooks(data.allBooks),
  })
  useEffect(() => {
    if (!result.data || !result.data.me) {
      return
    }
    getBooks({
      variables: {
        genre: result.data.me.favoriteGenre,
      },
    })
  }, [result.data])
  if (!show) {
    return null
  }
  if (result.loading) {
    return 'loading...'
  }
  console.log(result)
  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre{' '}
        <strong>{result.data.me.favoriteGenre}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
