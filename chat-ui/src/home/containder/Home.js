import React from 'react'
import { Input, Row, Col, Button } from 'reactstrap'
import socketClient from 'socket.io-client'
import uuid from 'uuid/v1'

class Home extends React.Component {
  constructor() {
    super()
    this.socket = socketClient('http://localhost:8080')
    this.state = {
      user: {},
      msg: '',
      dataMsg: [],
      register: false,
      me: JSON.parse(localStorage.getItem('user')),
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (text) {
    this.setState({ msg: text.target.value })
  }

  // send message
  handleClick = () => {
    this.socket.emit('send', {
      msg: this.state.msg,
      id: uuid(),
      date: new Date().getTime(),
      ...this.state.me,
    })
    this.setState({ msg: '' })
  }

  // recieve message
  recieveMsg = () => {
    const { dataMsg } = this.state
    this.socket.on('message', (data) => {
      const checkDuplicate = dataMsg.findIndex(Msg => Msg.id === data.id)
      if (checkDuplicate < 0) {
        dataMsg.push(data)
        this.setState({ dataMsg })
      }
    })

    this.socket.on('message-bc', (data) => {
      const checkDuplicate = dataMsg.findIndex(Msg => Msg.id === data.id)
      if (checkDuplicate < 0) {
        dataMsg.push(data)
        this.setState({ dataMsg })
      }
    })

  }

  // register user
  registerUser = () => {
    const { user } = this.state
    this.socket.on('news', (client) => {
      const data = this.state.me
      data.id = client.id;
      if (this.state.register === false) {
        this.socket.emit('register', data)
        this.setState({ register: true })
      }
    })
  }

  // succes register
  succesRegister = () => {
    this.socket.on('register-succes', (dataUser) => {
      this.setState({ user: dataUser })
    })

    this.socket.on('add-user', (data) => {
      this.setState({ user: data })
    })

    this.socket.on('first-msg', (data) => {
      this.setState({ dataMsg: Object.values(data) });
    })
  }

  render() {
    console.log('msg : ', this.state.dataMsg)
    this.registerUser()
    this.recieveMsg()
    this.succesRegister()

    return (
      <div>
        <Row>
          <Col xl={3} md={3} sm={12} style={{ borderRight: 'solid red 1px'}}>
            {Object.values(this.state.user).map((data) => {
              return (
                <div key={data.id}>
                  <img src={data.img} style={{ height: '30px' }} alt={data.name} />
                  {data.email}
                </div>
              )
            })}
          </Col>
          <Col xl={9} md={9} sm={12}>
            <Row style={{ padding: '5px' }}>
              <Col xl={12} md={12}>
                {this.state.dataMsg.map((msg) => {
                  if (msg.uid == this.state.me.uid) {
                    return <p style={{ color: 'red'}}>{msg.msg} </p>;
                  }
                  return <p>{msg.msg}</p>;
                })}
              </Col>
              <Col xl={11} md={10} sm={10}>
                <Input
                  type="textarea"
                  value={this.state.msg}
                  placeholder="text here"
                  onChange={this.handleChange}
                />
              </Col>
              <Col xl={1} md={2} sm={2}>
                <Button onClick={this.handleClick}>SEND</Button>
              </Col>
            </Row>
          </Col>
          <Col xl={12} style={{ backgroundColor: 'red' }} />
        </Row>
      </div>
    )    
  }
}

export default Home
