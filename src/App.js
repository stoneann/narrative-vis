import './App.css';
import { WordCloud } from './WordCloud';
import { NetworkDiagram } from './NetworkGraph';
import dataAnswer from './data/network-graph-error-answer.json';
import data from './data/network-graph-error-student.json';


function App() {
  return (
    <div className="App">
      Narrative Visualization
      <NetworkDiagram width={800} height={800} data={dataAnswer} />
      <NetworkDiagram width={800} height={800} data={data} />
    </div>
  );
}

export default App;
