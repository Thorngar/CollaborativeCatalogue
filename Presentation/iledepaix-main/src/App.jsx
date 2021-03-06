import "./App.css";
import React, { useState } from "react";
import NavBar from "./components/navBar.jsx";
import Page from "./pages/Page";
import Sidebar from "./components/Sidebar";
import FormTool from "./components/FormTool";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IsConnectContext from "./services/isConnect.context";
import ConnectForm from "./components/ConnectForm";
import Logout from "./pages/Logout";
import AdminForm from "./components/AdminForm";
import AdminCreate from "./components/AdminCreate";
import FormNewNGO from "./components/FormNewNGO";
import ListInfo from "./components/ListInfo";
import UpdatePasswordForm from "./components/UpdatePasswordForm";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";

function App() {
  const [isConnect, setIsConnect] = useState(false);

  const contextConnect = {
    isConnect,
    setIsConnect,
  };
  return (
    <IsConnectContext.Provider value={contextConnect}>
      <Router>
        <div className="App">
          <NavBar>
            {" "}
            <div id="navBar">
              <Sidebar pageWrapId={"pushRotate"} outerContainerId={"navBar"} />
            </div>
          </NavBar>
          <main>
            <Routes>
              <Route path="Page" element={<Page />} />
              <Route path="FormTool" element={<FormTool />} />
              <Route path="ConnectForm" element={<ConnectForm />} />
              <Route path="logout" element={<Logout />} />
              <Route path="AdminForm" element={<AdminForm />} />
              <Route path="AdminCreate" element={<AdminCreate />} />
              <Route path="FormNewNGO" element={<FormNewNGO />} />
              <Route path="ListInfo" element={<ListInfo />} />
              <Route
                path="UpdatePasswordForm"
                element={<UpdatePasswordForm />}
              />
              <Route path="/" element={<HomePage/>}></Route>
            </Routes>
           
          </main>
        </div>
        <Footer />
      </Router>
    </IsConnectContext.Provider>
  );
}

export default App;
