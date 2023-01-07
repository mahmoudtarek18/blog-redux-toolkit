import React from "react";

const Loading = ({ loading, error, children }) => {
  return (
    <>
      {loading ? (
        <p colSpan={3}>Loading please wait ...</p>
      ) : error ? (
        <p colSpan={3}>{error}</p>
      ) : (
        children
      )}
    </>
  );
};

export default Loading;
