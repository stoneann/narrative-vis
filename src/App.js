import './App.css';
import { WordCloud } from './WordCloud';
import { NetworkDiagram } from './NetworkGraph';
import data from './data/network-graph-error-student.json';
import { Boxplot } from './BoxPlot';

function App() {
  return (
    <div className="App">
      <div className='body'>
        <div className='header'>
          <div className='title'>Informational Title</div>
          <div className='row'>
            <div>
              <img className='round-img' src={require('./speaker_profile_crop.png')} alt='Photo'/>
            </div>
            <div>
              <div className='author'>Ann Stone</div>
              <div className='date'>Updated April 24, 2024</div>
            </div>
          </div>
        </div>
        <div className='text'>
          Take a guess, how many questions does the introduction to programming Piazza course at the University of Michigan have every semester?
        </div>
        <div className='text'>
          If it took staff members on average 5 minutes to answer a question, that’s 447 hours of staff time devoted towards answering questions each semester. What if we could reduce that time, though, by reducing the number of questions? This allows staff to reallocate time to teaching students how to debug their own code in office hours. It could lead to students being helped sooner in office hours, which would increase their chances of success.
        </div>
        <div className='text'>
          In order to reduce the number of questions, we first must find out what the questions are about. By finding commonly asked questions and struggle points, we can answer student questions before they have to ask them. Let’s begin our investigation by focusing on project 3 during the Winter 2023 semester. 
        </div>
        <div className='text'></div>
        <WordCloud />
        <div className='text'>
          Here is a word cloud of 30 the most frequently used words in student questions. The biggest words that stand out are function, error, and test. They also happen to be the words used in the most unique posts. It’s no surprise that function is amongst the most frequently used words because the project itself asks students to code specific functions, so in order to describe a problem the word function must be used to give accurate context. What is more interesting, though, is why “error” and “test” are used so frequently. Are there common aspects about tests that confuse students? Let’s do a deeper dive into the actual questions to find out.
        </div>
      </div>
      {/* <NetworkDiagram width={550} height={550} data={data}/> */}
      {/* <Boxplot width={400} height={400} data={data} /> */}
    </div>
  );
}

export default App;
