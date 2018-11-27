import React from 'react'
import { Card, CardBody, CardTitle, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap'

class SignUp extends React.Component{
  constructor() {
    super()
  }

  render() {
    return (
      <Card>
        <CardTitle>
          SignUp
        </CardTitle>
        <CardBody>
          <InputGroup>
            <InputGroupAddon addonType="prepend">Full Name</InputGroupAddon>
            <Input placeholder="" type="text" name="name" />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
            <Input placeholder="" type="email" name="email" />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">Password</InputGroupAddon>
            <Input placeholder="" type="password" name="email" />
          </InputGroup>
          <br />
          <div style={{ textAlign: 'right'}}>
            <Button>
              SignUp
            </Button>
          </div>
        </CardBody>
      </Card>
    )
  }
}

export default SignUp
