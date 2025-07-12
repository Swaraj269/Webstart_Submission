import React from "react";
import Routes from "./utils/RoutesFile";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Routes />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
