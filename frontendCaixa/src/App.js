import Rotas from "./Pages/routes"
import AuthProvider from "./Context/index.js";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.min.css'

export default function App() {
  return (
    <AuthProvider>
      <div>
        <ToastContainer
          autoClose={5000}
          position="top-right"
          theme="dark"
        />
        <Rotas />
      </div>
    </AuthProvider>
  );
}
