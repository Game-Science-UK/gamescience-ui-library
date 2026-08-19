import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "@site/components/Layout";
import { Components } from "@site/routes/Components";
import { Doc, Docs } from "@site/routes/Docs";
import { GetStarted } from "@site/routes/GetStarted";
import { Home } from "@site/routes/Home";
import { Manage } from "@site/routes/Manage";
import { Item } from "@site/routes/Item";
import { Skill, Skills } from "@site/routes/Skills";

/**
 * GitHub Pages serves this under a project path, so the router is based there.
 * Deep links rely on a `404.html` copy of `index.html`, written by build-pages
 * and asserted byte-identical by pages:validate.
 */
export function App() {
  return (
    <BrowserRouter basename="/gamescience-ui-library">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="get-started" element={<GetStarted />} />
          <Route path="manage" element={<Manage />} />
          <Route path="skills" element={<Skills />} />
          <Route path="skills/:slug" element={<Skill />} />
          <Route path="docs" element={<Docs />} />
          <Route path="docs/*" element={<Doc />} />
          <Route path="components" element={<Components />} />
          <Route path="components/:name" element={<Item />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
