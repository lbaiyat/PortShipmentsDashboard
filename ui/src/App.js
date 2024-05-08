import './App.css';
import {BrowserRouter} from "react-router-dom";

import ShipmentsGrid from "./components/ShipmentsGrid/ShipmentsGrid";
import NavComponent from "./components/NavComponent/NavComponent";
import RouterComponent from "./components/RouterComponent/RouterComponent";

function App() {
  return (
    <div className="App ">
    
        <BrowserRouter>
            <NavComponent />
            <RouterComponent/>
            
        </BrowserRouter>
      {/*<header className="App-header">*/}
      {/*  <ShipmentsGrid />*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
