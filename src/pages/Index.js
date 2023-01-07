import React, { useCallback, useEffect } from "react";
import PostList from "./../components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPosts } from "./../store/postSlice";
import Loading from "./../components/Loading";

const Index = () => {
  const dispatch = useDispatch();
  const { records, loading, error, status } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (status !== "success") dispatch(fetchPosts());
  }, []);

  const deleteRecord = useCallback(
    (id) => {
      dispatch(deletePost(id));
    },
    [dispatch]
  );
  return (
    <>
      <Loading loading={loading} error={error}>
        <PostList data={records} deleteRecord={deleteRecord} />
      </Loading>
    </>
  );
};

export default Index;
