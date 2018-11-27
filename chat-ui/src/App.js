import React from 'react'
import { Container, Nav, NavItem, NavLink } from 'reactstrap'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { createStore } from 'redux'

// import socketClient from 'socket.io-client'

import todoApp from './reducer'
import Login from './home/login'

import Home from './home'

const store = createStore(todoApp)

const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;
const Logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('credential')
  window.location.href = '/'
  return false
}


const AppRouter = () => {
  if (localStorage.getItem('user') == null) {
    return <Login {...this}/>
  }

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Nav style={{ backgroundColor: 'black'}}>
            <NavItem>
              <NavLink>
                <Link to="/">Home</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/about/">About</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/users/">Users</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/logout">Logout</Link>
              </NavLink>
            </NavItem>
          </Nav>
         <Container fluid style={{padding: '0px' }}>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/about/" component={About} />
            <Route path="/users/" component={Users} />
            <Route path="/logout/" component={Logout} />
          </Container>
        </div>
      </Router>
    </Provider>
  )
}

export default AppRouter;
