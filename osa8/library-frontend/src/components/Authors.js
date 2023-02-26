import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS, {
    skip: !props.show,
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const handleAuthorUpdate = (event) => {
    event.preventDefault()
    console.log('Author updated')
    editAuthor({
      variables: {
        name: event.target.name.value,
        setBornTo: parseInt(event.target.born.value),
      },
    })
    event.target.name.value = ''
    event.target.born.value = ''
  }

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return 'Loading...'
  }
  if (result.error) {
    return `Ran into some error: ${result.error.message}`
  }
  const authors = result.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>set birthyear</h3>
      <form onSubmit={handleAuthorUpdate}>
        <div>
          name
          <select name="name">
            {authors.map((a) => (
              <option key={a.id}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input name="born" />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
