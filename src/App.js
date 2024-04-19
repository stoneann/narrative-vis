import './App.css';
import { WordCloud } from './WordCloud';
import { NetworkDiagram } from './NetworkGraph';

function App() {
  return (
    <div className="App">
      Narrative Visualization
      <NetworkDiagram width={800} height={800} />
    </div>
  );
}

export default App;
