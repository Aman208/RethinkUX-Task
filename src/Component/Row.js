import Cell from './Content';
import '../App.css';

const Row = (props) => {
  

 return (
  <div className='Row'>
  {
  props.columns.map(()=><Cell/>)
  }
 
  </div>

 );

}


export default Row;