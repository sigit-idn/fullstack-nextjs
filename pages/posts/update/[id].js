import { Container, Form, Button, Modal } from "react-bootstrap";
import Router from "next/router";
import { authPage } from "../../../middlewares/authorizationPage";
import { useState } from "react";

export async function getServerSideProps(context) {
  const { token } = await authPage(context);
  const { id } = context.query;
  const posts = await fetch("http://localhost:3000/api/posts", {
    headers: { authorization: "Bearer " + token },
  }).then((res) => res.json());
  return { props: { id, token, posts } };
}

export default function UpdatePost(props) {
  const [status, setStatus] = useState('Edit');
  const post = props.posts.data.filter(
    (post) => post.id == props.id && post
    )[0];
    const [editContents, setEditContets] = useState({ title : post.title, content : post.content });
  const editPost = (event) => {
    event.preventDefault();
    setStatus(('loading ...'))
    fetch('/api/posts/update/' + props.id, {
      method    : 'put',
      headers   : {
        'Content-Type'  : 'Application/JSON',
        'authorization' : 'Bearer ' + props.token
      },
      body      : JSON.stringify(editContents)
    }).then(setStatus(''))
  };
  const typing = (event) => {
    event.preventDefault();
    setEditContets({
      ...editContents,
      [event.target.name]: event.target.value,
    });
  };
  const backButton = (
    <Button variant="secondary" onClick={() => Router.push("/posts")}>
      Close
    </Button>
  );

  return (
    <Container className="mt-5" onSubmit={editPost}>
      <h1>Edit Post</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            onChange={typing}
            name="title"
            placeholder="Enter title"
            defaultValue={post.title}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            onChange={typing}
            name="content"
            rows={5}
            defaultValue={post.content}
          />
        </Form.Group>
        <Button variant="primary mr-2" type="submit">
          {status || 'Edit'}
        </Button>
        {backButton}
      </Form>

      <Modal show={!status}>
        <Modal.Body>Postingan berhasil diubah</Modal.Body>
        <Modal.Footer>{backButton}</Modal.Footer>
      </Modal>
    </Container>
  );
}
