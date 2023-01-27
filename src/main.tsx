import React from "react";
import ReactDOM from "react-dom/client";
import { createDriver, Neo4jProvider } from "use-neo4j";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Provider from "./theme/provider";
import RouterProvider from "./router/provider";

const driver = createDriver(
  "neo4j+s",
  "16ae1b60.databases.neo4j.io",
  7687,
  "neo4j",
  "Wo_ZMKeSWL9Kvdo5XrfIUDVyoGnKDBWZts6fonlJToM"
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Neo4jProvider driver={driver}>
      <Provider>
        <RouterProvider />
      </Provider>
    </Neo4jProvider>
  </React.StrictMode>
);
