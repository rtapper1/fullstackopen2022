/* eslint-disable indent */
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre,
    },
    skip: !props.show,
  })
  const allGenres = useQuery(ALL_GENRES, {
    skip: !props.show,
  })
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return 'Loading...'
  }
  if (result.error) {
    return `Ran into some error: ${result.error.message}`
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>
      {genre ? (
        <div>
          in genre <strong>{genre}</strong>
        </div>
      ) : null}
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
      {allGenres.data
        ? allGenres.data.allGenres.map((g) => (
            <button key={g} onClick={() => setGenre(g)}>
              {g}
            </button>
          ))
        : undefined}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books
