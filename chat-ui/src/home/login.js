import React from 'react'
import { Container, Row, Col, Button, Jumbotron } from 'reactstrap'
import * as firebaseui from 'firebaseui'
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCIF0xDxHMLqkjhZ78VA1aMH0G2q064NXo",
  authDomain: "chat-89e6b.firebaseapp.com",
  databaseURL: "https://chat-89e6b.firebaseio.com",
  projectId: "chat-89e6b",
  storageBucket: "chat-89e6b.appspot.com",
  messagingSenderId: "431865561497"
}

firebase.initializeApp(config)

class Login extends React.Component {
  constructor() {
    super()
    this.fb = firebase
    this.state = {
      user: {}
    }

  }

  Login = () => {
    const ui = new firebaseui.auth.AuthUI(this.fb.auth());
    ui.start('#firebaseui-auth-container', {
      signInFlow: 'popup',
      callbacks: {
        signInSuccess: function (user, credential, redirectUrl) {
          localStorage.setItem('uid', user.uid)
          localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            name: user.displayName,
            img: user.photoURL,
            email: user.email
          }))
          localStorage.setItem('credential', credential)
          window.location.href = '/'
          return false;
        },
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    });
  }

  render() {
    this.Login()
    return(
      <div>
        <Jumbotron style={{ minHeight: '400px'}}>
          <Container style={{ textAlign: 'center' }}>
            {/* {this.state.user} */}
            <h4>LOGIN</h4>
            <div id="firebaseui-auth-container"></div>
          </Container>
        </Jumbotron>
      </div>
    )
  }
}

export default Login
