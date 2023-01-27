import { RouterProvider as Provider } from "react-router-dom";
import React from "react";
import router from "./index";

const RouterProvider: React.FC = () => {
  return <Provider router={router} />;
};

export default RouterProvider;
