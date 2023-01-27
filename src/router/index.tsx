import { createBrowserRouter } from "react-router-dom";
import MovieList from "../movie/list";
import React from "react";
import { AppRoutes } from "./routes";
import Layout from "../layout";
import MovieDetails from "../movie/details";
import PersonList from "../person/list";
import PersonDetails from "../person/details";

const router = createBrowserRouter([
  {
    path: AppRoutes.Base(),
    element: <Layout />,
    children: [
      {
        path: AppRoutes.Movies(),
        element: <MovieList />,
      },
      {
        path: AppRoutes.Movie(),
        element: <MovieDetails />,
      },
      {
        path: AppRoutes.Persons(),
        element: <PersonList />,
      },
      {
        path: AppRoutes.Person(),
        element: <PersonDetails />,
      },
    ],
  },
]);

export default router;
