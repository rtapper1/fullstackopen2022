import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { signOutUser } from '../reducers/userReducer'

const UserText = (props) => {
  const dispatch = useDispatch()
  return (
    <span>
      {props.name} logged in{' '}
      <button id="logout-button" onClick={() => dispatch(signOutUser())}>
        logout
      </button>
    </span>
  )
}

const Navigation = () => {
  const user = useSelector((state) => state.user)
  return (
    <div className="nav-bar">
      <table>
        <thead>
          <tr>
            <th>
              <Link to="/">blogs</Link>
            </th>
            <th>
              <Link to="/users">users</Link>
            </th>
            <th>
              {user ? (
                <UserText name={user.name} />
              ) : (
                <Link to="/login">login</Link>
              )}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  )
}

export default Navigation
