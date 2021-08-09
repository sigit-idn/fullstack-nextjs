import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import register from "../api/auth/register";

const Register = () => {
    // const [fields, setFields] = useState({email: '', password: ''})

    // const fieldHandler = event => console.log(event.target.value)

    // const registerHandler = event => {
        // event.preventDefault(); 
        // fetch('http://localhost:3000/api/auth/register', {
        // headers: {authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2MTMyMDMyMDcsImV4cCI6MTYxODM4NzIwN30.fDMzhABxtLRpFak6KceigN9Ha-c2StAXflpc-joR3AU"},
        // method : 'POST',
        // body : {"email" : this.email.value, "password" : this.password.value}})
    // }

    return <Container className="mt-3">
    <h1>Register</h1>

    <Form onSubmit={registerHandler.bind(this)}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={fieldHandler} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </Container>
};

export default Register;
