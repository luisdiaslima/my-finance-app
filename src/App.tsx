import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { CreditProvider } from "./context/CreditContext";

export default function App() {
  return (
    <CreditProvider>
      <RouterProvider router={router} />
    </CreditProvider>
  );
}
