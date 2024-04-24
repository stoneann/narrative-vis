import './App.css';
import { WordCloud } from './WordCloud';
import { NetworkDiagram } from './NetworkGraph';
import data from './data/boxplot.json';
import { Boxplot } from './BoxPlot';


function App() {
  return (
    <div className="App">
      Narrative Visualization
      <Boxplot width={400} height={400} data={data} />
    </div>
  );
}

export default App;
