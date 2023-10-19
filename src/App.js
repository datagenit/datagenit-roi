import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/corporate-ui-dashboard.css';
import './assets/css/nucleo-icons.css';
import './assets/css/nucleo-svg.css';
import Index from "./Component/dashboard/Index";
import AddEvent from "./Component/dashboard/AddEvent";
import ListEvent from "./Component/dashboard/ListEvent";
import Login from "./Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/dashboard" element={<Index />} />
        <Route path="/dashboard/add-event" element={<AddEvent />} />
        <Route path="/dashboard/list-event" element={<ListEvent />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
