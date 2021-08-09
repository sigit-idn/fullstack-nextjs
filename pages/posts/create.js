import { useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import Router from 'next/router'
import { authPage } from "../../middlewares/authorizationPage";

export async function getServerSideProps(context) {
  // return {props : {token: context.req.headers.cookie.split('=')[1]}}
  const {token} = await authPage(context)
  return {props : {token}}
}

export default function PostCreate(props) {
  const [postData, setPostData] = useState({ title: "", content: "" });
  const [isSuccess, setSuccess] = useState(false)

  const typing = (event) =>
    setPostData({ ...postData, [event.target.name]: event.target.value });
  const createPost = async (event) => {
    event.preventDefault();
    const {token} = props;

    await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization:
          "Bearer " + token,
      },
      body: JSON.stringify(postData),
    }).then(res => res.ok && setSuccess(true));
  };

  return (
    <Container className="mt-5" onSubmit={createPost}>
      <h1>Create a Post</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            onChange={typing}
            name="title"
            placeholder="Enter title"
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            onChange={typing}
            name="content"
            rows={5}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Modal show={isSuccess}>
        <Modal.Body>Postingan berhasil ditambahkan</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSuccess(false) & Router.push('/posts')}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
