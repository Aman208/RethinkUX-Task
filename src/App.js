import './App.css';
import ParagraphEditor from './Editor/editor';
import TablesEditor from './Table/index';

function App() {
  return (
    <div className="App">
      <h3>Slate JS Editor</h3>
      <br/>
      <ParagraphEditor/>
      <TablesEditor/>
    </div>
  );
}

export default App;