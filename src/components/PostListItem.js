import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PostListItem = ({ data, deleteRecord }) => {
  const navigate = useNavigate();
  const deleteHandler = (item) => {
    if (window.confirm(`do you want to delete ${item.title} ?`)) {
      deleteRecord(item.id);
    }
  };
  const records = data.map((el, index) => (
    <tr key={index}>
      <td>#{index++}</td>
      <td>{el.title}</td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="success"
            onClick={() => navigate(`post/${el.id}/edit`, { state: el })}
          >
            Edit
          </Button>
          <Button variant="danger" onClick={() => deleteHandler(el)}>
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  ));
  return <>{records}</>;
};

export default PostListItem;
