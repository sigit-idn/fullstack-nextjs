import Router from "next/router";
import { useState } from "react";
import { Container, Card, Button, Navbar, Modal } from "react-bootstrap";
import { authPage } from "../../middlewares/authorizationPage";
import Cookie from 'js-cookie';

export async function getServerSideProps(context) {
  const { token } = await authPage(context);
  const post = await fetch("http://localhost:3000/api/posts", {
    headers: { authorization: "Bearer " + token },
  }).then((res) => res.json());

  return { props: { posts: post.data, token } };
}

export default function Posts(props) {
  const [posts, setPosts] = useState(props.posts);
  const [isDeleting, setDeleting] = useState(0);

  const deletePost = async () => {
    setPosts(posts.filter((post) => post.id !== isDeleting));
    await fetch("/api/posts/delete/" + isDeleting, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    }).then(setDeleting(0));
  };

  return (
    <Container className="mt-3">
      <Navbar>
        <Navbar.Brand href="#home">Posts</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button
            variant="primary"
            onClick={() => Router.push("/posts/create")}
          >
            Create a Post
          </Button>
          <Button
            variant="warning ml-2"
            onClick={() => Cookie.remove('token') & Router.replace('/auth/login')}
          >
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <div className="row mt-3">
        {posts.map((post) => (
          <div className="col-4" key={post.id}>
            <Card className="m-1">
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <Button variant="primary" onClick={ () => Router.push({pathname : '/posts/update/' + post.id}) }>Edit</Button>
                <Button
                  variant="danger ml-2"
                  onClick={() => setDeleting(post.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={isDeleting}>
        <Modal.Body>Sure want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deletePost.bind("this")}>
            Delete
          </Button>
          <Button variant="secondary" onClick={() => setDeleting(0)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
