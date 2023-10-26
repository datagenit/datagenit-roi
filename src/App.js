import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/corporate-ui-dashboard.css';
import './assets/css/nucleo-icons.css';
import './assets/css/nucleo-svg.css';
import Index from "./Component/dashboard/Index";
import AddEvent from "./Component/dashboard/AddEvent";
import ListEvent from "./Component/dashboard/ListEvent";
import Login from "./Component/Login";
import Logout from './Component/Logout';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from './Component/admin/Admin';
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {

  const lStorage = JSON.parse(localStorage.getItem("login"));
  let userId;
  if (lStorage) {
    userId = lStorage.user.userId;
  } else {
    userId = null;
  }


  return (
    <BrowserRouter>
      <Routes>

        <Route path="/dashboard" element={<Index />} />
        <Route path="/dashboard/add-event" element={<AddEvent />} />
        <Route path="/dashboard/list-event" element={<ListEvent />} />
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
