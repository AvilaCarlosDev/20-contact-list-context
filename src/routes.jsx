import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Contacts } from "./pages/Contacts";
import { AddContact } from "./pages/AddContact";
import { Demo } from "./pages/Demo";
import { Single } from "./pages/Single";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Contacts />} />
      <Route path="add" element={<AddContact />} />
      <Route path="edit/:id" element={<AddContact />} />
      <Route path="demo" element={<Demo />} />
      <Route path="single/:theId" element={<Single />} />
      <Route path="*" element={<h1>Not found!</h1>} />
    </Route>,
  ),
  { basename: import.meta.env.BASE_URL },
);
