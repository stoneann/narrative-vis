import './App.css';
import { WordCloud } from './WordCloud';
import { NetworkDiagram } from './NetworkGraph';
import data from './data/network-graph-error-student.json';
import instructorData from './data/network-graph-error-answer.json';
import boxplotData from './data/boxplot.json';
import { Boxplot } from './BoxPlot';
import ContinuousSlider from './Slider';
import Dashboard from './Dashboard';

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
          Take a guess - how many questions does the introduction to programming Piazza course at the University of Michigan receive every semester?        </div>
        <div className='text'></div>
        <ContinuousSlider />
        <div className='text'>
          If it took staff members on average 5 minutes to answer a question, that’s 447 hours of staff time devoted towards answering questions each semester. What if we could reduce that time, though? By reducing the number of questions, staff can reallocate time to teaching students one on one in office hours, which can directly increase student knowledge and success.        </div>
        <div className='text'>
          In order to reduce the number of questions, we first must find out what the questions are about. By finding commonly asked questions and struggle points, we can answer student questions before they have to ask them. Let’s begin our investigation by focusing on project 3 during the Winter 2023 semester. 
        </div>
        <div className='text'></div>
        <WordCloud handleWordClicked={() => {}} wordClicked="" />
        <div className='text'>
          The word cloud above shows the most frequently used words in student questions. Evaluating the most frequently used words can give us an approximation of what general concepts spur the most questions. The biggest words that stand out are function, error, and test. They also happen to be the words used in the most unique posts. It’s no surprise that “function” is amongst the most frequently used words because project 3 asks students to code specific functions, so describing a problem requires the word “function”. What is more interesting, though, is why “error” and “test” are used so frequently. What aspects of these concepts do students find confusing? Let’s do a deeper dive into the actual questions to find out.
        </div>
        <NetworkDiagram width={550} height={550} data={data} id={'one'} />
        <div className='text'>
          Each dot in the network graph represents one question asked in project 3 Winter 2023 that contains the word “error” in it. Any dots connected by a line have a similarity of above 60%. There are 16 groups of similar posts that can reveal the most confusing concepts for students. Looking at the biggest group of similar questions positioned in the center of the graph, each question asks a version of “what does this error message mean”. This shows a potential gap in the teaching and resources provided by the course - reading and understanding error messages. By providing these resources, staff can spend less time explaining the parts of an error message and more time helping students fix these error messages.         
        </div>
        <div className='text'>
          Error messages are an integral part of the Introduction to Programming course, thus are prevalent every semester. If students are confused on error messages in Winter 2023, are students in other semesters as well? Let’s find out.
        </div>
        <Boxplot width={550} height={550} data={boxplotData} />
        <div className='text'>
          The graph above compares each question in the Winter 2023 semester to all questions in the previous semester and finds its max similarity in each semester. The distribution across semesters is fairly the same across semesters, with most posts falling in the 35% to 55% range. Questions that have this much similarity may be able to give students enough information to answer their own question. A quarter of the questions are nearly identical, falling in the 55% to 85% range. These are questions that instructors have to answer again and again each semester. Having questions this similar each semester reveals the amount of staff time wasted re answering questions. Providing more resources for confusing concepts will be beneficial for students every semester.        
        </div>
        <div className='text'>
        Analyzing student questions is not the only way we can find ways to improve the resources and teaching in the Introduction to Programming course. Instructor responses can also reveal what knowledge students are missing. Let’s do a deeper dive into the actual answers to find out.
        </div>
        <NetworkDiagram width={550} height={550} data={instructorData} id={'two'} />
        <div className='text'>
          Looking at the second biggest interconnected chunk, all of those data points ask students to run their code in CAEN with the address sanitizer off. This is a very useful debugging technique in the course. Because students must be directed to run their code in CAEN, it shows that the current resources on debugging techniques does not emphasize enough to do so. This could be a potential improvement to the course so students can more thoroughly attempt to fix their errors before asking.
        </div>
        <div className='text'>
          One of the most key observations to make is that, unlike the question node groups, answer node groups are very interconnected. This could be because instructors know the correct verbage to use for particular problems. The algorithm used to determine similarity in this article is a simple cosine similarity, which only compares the exact words used in each text. If a student doesn’t know the correct verbage to use, it would make searching for the answer on Piazza difficult because the search on piazza also only compares exact words. This would result in duplicate questions being asked without the students realizing. 
        </div>
        <div className='text'>
          A further point of research in this topic would be improving the algorithm used to determine similarity. A better algorithm than the cosine similarity would be the ability to semantically match text. This would allow the algorithm to highlight questions that are the same, even if the words used were different. 
        </div>
      </div>
      <Dashboard />
    </div>
  );
}

export default App;
