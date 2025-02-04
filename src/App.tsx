import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { UserProvider } from "@/context/UserContext";
import { CreditProvider } from "./context/CreditContext";

export default function App() {
  return (
    <UserProvider>
      <CreditProvider>
        <RouterProvider router={router} />
      </CreditProvider>
    </UserProvider>
  );
}
