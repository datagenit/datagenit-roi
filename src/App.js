import React from 'react';
import Index from "./Component/dashboard/Index";
import ListEvent from "./Component/admin/ListEvent";
import AddStore from "./Component/dashboard/AddStore";
import ListStore from "./Component/dashboard/ListStore";
import AddCustomer from "./Component/admin/AddCustomer";
import ListCustomer from "./Component/admin/ListCustomer";
import EditCustomer from "./Component/admin/EditCustomer";
import Admin from "./Component/admin/Admin";
import Login from "./Component/Login";
import Logout from './Component/Logout';
import PageNotFound from "./Component/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminProtected from "./Component/Utils/AdminProtected";
import Protected from "./Component/Utils/Protected";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Index />} />
        <Route path="/admin/list-event" element={<ListEvent />} />
        <Route path="/dashboard/add-store" element={<AddStore />} />
        <Route path="/dashboard/list-store" element={<ListStore />} />
        <Route path="/admin/add-customer" element={<AddCustomer />} />
        <Route path="/admin/list-customer" element={<ListCustomer />} />
        <Route path="/admin/edit-customer/:id" element={<EditCustomer />} />
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
