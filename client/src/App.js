import "./App.css";
import MyRoute from "./components/MyRoute";
import { Toaster } from "react-hot-toast";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2000,
        }}
      />

      <MyRoute />
    </div>
  );
}

export default App;
