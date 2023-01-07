import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Details from "./pages/Details";
import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";
import { Provider } from "react-redux";
import store from "./store/index";
import WithGuard from "./components/WithGuard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "post/add",
        element: (
          <WithGuard>
            <AddPost />
          </WithGuard>
        ),
      },
      {
        path: "post/:id",
        element: <Details />,
        loader: ({ params }) => {
          if (isNaN(params.id)) {
            throw new Response("Bad Request", {
              statusText: " please make sure to insert correct post id",
              status: 400,
            });
          }
        },
      },
      { path: "post/:id/edit", element: <EditPost /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
