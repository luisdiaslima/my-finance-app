import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import NatualPerson from "./pages/NaturalPerson";
import JuridicalPerson from "./pages/JuridicalPerson";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pessoa-fisica",
    element: <NatualPerson />,
  },
  {
    path: "/pessoa-juridica",
    element: <JuridicalPerson />,
  },
]);

export default router;