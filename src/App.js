import React from 'react';
import Index from "./Component/dashboard/Index";
import AddStore from "./Component/dashboard/AddStore";
import ListEvent from "./Component/dashboard/ListEvent";
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
        <Route path="/dashboard/add-store" element={<AddStore />} />
        <Route path="/dashboard/list-event" element={<ListEvent />} />
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
