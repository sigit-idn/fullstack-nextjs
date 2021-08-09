import Link from "next/link";
import { useState } from "react"
import { Container, Form, Button, Modal } from "react-bootstrap"

const Register = () => {
    const [fields, setFields] = useState({email: '', password: ''});
    const [status, setStatus] = useState('');
    const [modalShow, setModalShow] = useState(false)

    const handleFields = event => {
        const inputName = event.target.name;
        setFields({ ...fields, [inputName] : event.target.value})
    };
    
    const handleRegister = async event => {
        event.preventDefault();

        setStatus('loading')
        const register = await fetch('/api/auth/register', {
        headers: {
            "Content-Type" : "application/json"},
        method : 'POST',
        body : JSON.stringify(fields)})
        
        setStatus(!register.ok ? 'Register Failed' : 'Register Success')
        setModalShow(true)
    }

    return <Container>
        <h2 className="mt-3">Register</h2>
        <Form onSubmit={handleRegister.bind(this)}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" type="email" placeholder="Enter email" onChange={handleFields.bind(this)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Password" onChange={handleFields.bind(this)} />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>
      <Button variant="primary mr-2" type="submit" disabled={status == 'loading'}>
        {status == 'loading' ? "Loading ..." : "Register" }
      </Button>
      <Link href='/auth/login'>Login</Link>
    </Form>

    <Modal show={modalShow}>
        <Modal.Body>{status}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
}

export default Register