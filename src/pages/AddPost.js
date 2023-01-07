import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { insertPost } from "./../store/postSlice";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fromHandler = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 500);
    dispatch(insertPost({ id, title, description }))
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

export default AddPost;
