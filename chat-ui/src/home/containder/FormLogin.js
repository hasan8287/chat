import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap'

class FormLogin extends React.Component {
  render() {
    return (
      <Row>
        <Col xl={4}>
          <Form method="POST">
            <FormGroup>
              <Label for="name">Email</Label>
              <Input type="text" name="name" id="name" placeholder="FullName" />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" placeholder="Email@email.com" />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default FormLogin
