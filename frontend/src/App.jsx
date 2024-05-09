import "./App.css";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss pauseOnHover theme="light" draggable/>
        <NavBar />
        <div className="container">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
