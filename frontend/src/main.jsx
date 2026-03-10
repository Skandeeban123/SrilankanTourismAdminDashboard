import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Header from "./components/Header.jsx";
import StateF from "./components/StateF.jsx";
import StateC from "./components/StateC.jsx";
import Statef2 from "./components/Statef2.jsx";
import StateC2 from "./components/StateC2.jsx";
import Form from "./components/Form.jsx";
import UseRef1 from "./components/UseRef1.jsx";
import { Crud } from "./components/Crud.jsx";

import './components/Crud.css';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />

    
  </StrictMode>
);
