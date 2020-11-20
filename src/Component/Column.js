import Row from "./Row";
import "../App.css";

const Column = (props) => {
  return (
    <div className="Column">
      {props.rows.map(() => (
        <Row columns={props.columns} />
      ))}
    </div>
  );
};

export default Column;

