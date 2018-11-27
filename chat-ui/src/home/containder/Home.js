import React from 'react'
import { Input, Row, Col, Button } from 'reactstrap'
import socketClient from 'socket.io-client'
import uuid from 'uuid/v1'

class Home extends React.Component {
  constructor() {
    super()
    this.socket = socketClient('http://localhost:8080')
    this.state = {
      user: [],
      msg: '',
      dataMsg: [],
      register: false
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
      uuid: uuid(),
    })
    this.setState({ msg: '' })
  }

  // recieve message
  recieveMsg = () => {
    const { dataMsg } = this.state
    this.socket.on('message', (data) => {
      const checkDuplicate = dataMsg.findIndex(Msg => Msg.uuid === data.uuid)
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
      console.log('client : ', client)
      const data = JSON.parse(localStorage.getItem('user'))
      data.id = client.id
      // Object.assign(user, JSON.parse(localStorage.getItem('user')))
      // user.push(data)
      console.log('user : ',  user)
      console.log('data : ',  data)

      const dataUser = [...client.data, data]
      console.log('dataUser : ',  dataUser)
      
      this.setState({ user: dataUser })
      if (this.state.register === false) {
        this.socket.emit('register', data)
        this.setState({ register: true })
      }
    })
  }

  // succes register
  succesRegister = () => {

  }

  render() {
    this.registerUser()
    this.recieveMsg()
    this.succesRegister()

    return (
      <div>
        <Row>
          <Col xl={3} md={3} sm={12} style={{ borderRight: 'solid red 1px'}}>
            {this.state.user.map((data) => {
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
                  return (
                    <p>
                      {msg.msg}
                    </p>
                  )
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
