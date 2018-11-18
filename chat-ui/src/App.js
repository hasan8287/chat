import React from 'react'
import { Jumbotron, Container, Nav, NavItem, NavLink } from 'reactstrap'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { createStore } from 'redux'

import todoApp from './reducer'
import Login from './home/login'

const store = createStore(todoApp)

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const AppRouter = () => (
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
        </Nav>
        <Jumbotron fluid style={{ height: '100%', paddingBottom: '0px', marginBottom: '0px' }}>
          <Container fluid>
            <Route path="/" exact component={Index} />
            <Route path="/login" exact component={Login} />
            <Route path="/about/" component={About} />
            <Route path="/users/" component={Users} />
          </Container>
        </Jumbotron>
      </div>
    </Router>
  </Provider>
);

export default AppRouter;
