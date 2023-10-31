import React from 'react';
import Index from "./Component/dashboard/Index";
import AddStore from "./Component/dashboard/AddStore";
import AddEvent from "./Component/dashboard/AddEvent";
import ListEvent from "./Component/dashboard/ListEvent";
import "react-datepicker/dist/react-datepicker.css";
import Admin from "./Component/admin/Admin";
import Login from "./Component/Login";
import Logout from './Component/Logout';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminProtected from "./Component/Utils/AdminProtected";
import Protected from "./Component/Utils/Protected";

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/dashboard" element={<Index />} />

        <Route path="/admin/add-event" element={<AddEvent />} />
        <Route path="/admin/list-event" element={<ListEvent />} />
        <Route path="/admin/add-store" element={<AddStore />} />
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
