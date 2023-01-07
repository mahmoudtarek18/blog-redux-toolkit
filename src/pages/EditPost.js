import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editPost } from "../store/postSlice";

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: postItem } = useLocation();
  const [title, setTitle] = useState(postItem.title);
  const [description, setDescription] = useState(postItem.description);

  const fromHandler = (e) => {
    e.preventDefault();
    const id = postItem.id;
    dispatch(editPost({ id, title, description }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <>
      <Form onSubmit={fromHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default EditPost;
