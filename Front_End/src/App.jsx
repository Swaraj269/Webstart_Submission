import React from "react";
import Routes from "./utils/RoutesFile";
import Navbar from "./utils/Navbar";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Navbar />
      <Routes />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
