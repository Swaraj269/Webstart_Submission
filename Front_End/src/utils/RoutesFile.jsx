import { Routes, Route } from "react-router-dom";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Items from "../Components/Items";
import ItemDetails from "../Components/ItemDetails";
import AddItem from "../Components/AddItem";
import Dashboard from "../Components/Dashboard";
import Admin from "../Components/Admin";
import Landing from "../Components/Landing";

function RoutesFile() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/items" element={<Items />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default RoutesFile;
