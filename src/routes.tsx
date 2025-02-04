import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import NatualPerson from "./pages/NaturalPerson";
import JuridicalPerson from "./pages/JuridicalPerson";
import CreditResult from './pages/CreditResult'
import CreditList from "./pages/CreditList";

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
  {
    path: "/seu-credito",
    element: <CreditResult />,
  },
  {
    path: "/consultas",
    element: <CreditList />,
  }
]);

export default router;