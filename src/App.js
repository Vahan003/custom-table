import React from "react";
import CustomTabe from './components/CustomTable'
import {headers, data} from "./data/data"
function App() {
  return (
    <div>
   <CustomTabe headers={headers} data= {data}/>
    </div>
  );
}

export default App;
