import Column from "./Column";
import "../App.css";
// import {useStae , useEffect} from 'react';

const Table = () => {
  const columns  = ["col_1", "col_2", "col_3"];
  const rows = ["row_1", "row_2", "row_3"];


   var addRowUp = ()=> {
    
  }

  function addRowDown(){

  }

  function addColumnLeft(){

  }

  function addColumnRight(){

  }

  return (
    <div className="App-header">
       <div className="Row" >
           <button onClick={()=>addRowUp()} > ADD ROW UP</button>
           <button onClick={()=>addRowDown() } > ADD ROW dOWN</button>
           <button onClick={()=>addColumnLeft() }> ADD COLUMN LEFT</button>
           <button onClick={()=>addColumnRight()} > ADD COLUMN RIGHT</button>
           </div> 
      <Column columns={columns} rows={rows}/>
    </div>
  );
};

export default Table;