import React from 'react';
import Index from "./Component/dashboard/Index";
import ListEvent from "./Component/admin/ListEvent";
import ListStore from "./Component/admin/ListStore";
import AddCustomer from "./Component/admin/AddCustomer";
import ListCustomer from "./Component/admin/ListCustomer";
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
        <Route path="/admin/list-store" element={<ListStore />} />
        <Route path="/admin/add-customer" element={<AddCustomer />} />
        <Route path="/admin/list-customer" component={ListCustomer} />
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
