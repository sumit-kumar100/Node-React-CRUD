import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import DefaultAxios from 'axios';
import "./scss/volt.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./index.css";
import "react-datetime/css/react-datetime.css";
import HomePage from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from 'react-hot-toast';


DefaultAxios.defaults.baseURL = "http://127.0.0.1:8000"


ReactDOM.render(
  <HashRouter>
    <Toaster />
    <ScrollToTop />
    <HomePage />
  </HashRouter>,
  document.getElementById("root")
);
