import { useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import Cookie from "js-cookie";
import Router from "next/router";
import { unauthPage } from '../../middlewares/authorizationPage';
import Link from 'next/link'

export async function getServerSideProps (context) {
    // console.log(context.req.headers.cookies) 
    await unauthPage(context)

    return {props: {}}
}

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");

//   useEffect digunakan untuk mengecek kuki di client side. Kalau cek kuki, sebaiknya dilakukan di server side
//   useEffect(() => Cookie.get('token') && Router.push('/posts'), [])
  const handleFields = (event) => {
    const name = event.target.name;

    setLoginData({ ...loginData, [name]: event.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setStatus("loading");
    const login = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
    const loginRes = await login.json()
    setStatus(login.ok ? "success" : "error")

    Cookie.set('token', loginRes.token);
    Router.push('/posts')
  };
  return (
    <Container>
      <h2 className="mt-3">Login</h2>
      <Form onSubmit={handleLogin.bind(this)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleFields.bind(this)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleFields.bind(this)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button variant="primary mr-2" type="submit" disabled={status == "loading"}>
          {status == "loading" ? "Loading ..." : "Login"}
        </Button>
            <Link href='/auth/register'>Register</Link>
      </Form>

      <Modal show={status == "error"}>
        <Modal.Body>Username or password is wrong!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setStatus("")}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    
  );
};

export default Login;
