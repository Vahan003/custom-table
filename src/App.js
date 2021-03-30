import React from "react";
import CustomTabe from "./components/CustomTable";
import { headers, data } from "./data/data";
function App() {
  return (
    <>
      <CustomTabe
        headers={headers}
        data={data}
        onItemClick={(item) => console.log(item.target)}
        onRemoveItems={(items) => console.log(items)}
        onFilter={()=>{console.log("onFilter is called!")}}
        onScroll = {()=>{console.log("onScroll is called!")}}
      />
    </>
  );
}

export default App;
