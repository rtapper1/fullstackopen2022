//import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

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
    <Navbar bg="primary" variant="dark" expand="sm">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">blogs</Nav.Link>
            <Nav.Link href="/users">users</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {!user ? (
            <Nav.Link href="/login">login</Nav.Link>
          ) : (
            <Navbar.Text>
              <UserText name={user.name} />
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
