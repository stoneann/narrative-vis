import './App.css';
import { WordCloud } from './WordCloud';
import { NetworkDiagram } from './NetworkGraph';
import questionData from './data/nodes_and_links/question/W23/project3.json';
import answerData from './data/nodes_and_links/answer/W23/project3.json';
import boxplotData from './data/max_similarity/question/project3.json';
import idData from './data/ids.json';
import { Boxplot } from './BoxPlot';
import ContinuousSlider from './Slider';
import Dashboard from './Dashboard';
import { useEffect, useState } from 'react';

function App() {
  const [removedNodeIds, setRemovedNodeIds] = useState([])

  useEffect(() => {
    var newWord = "error"
    var list = []

    for (var i = 0; i < idData.length; i++) {
      var words = idData[i].value.split(" ")
      var found = false
      words.forEach((word) => {
          if (word == newWord) {
              found = true
          }
      })
      if (!found) {
          list.push(idData[i].id)
      }
    }
    
    setRemovedNodeIds(list);
  }, [])

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
          The word cloud above shows the most frequently used words in student questions. Evaluating the most frequently used words can give us an approximation of what general concepts spur the most questions. The biggest words that stand out are “card”, “player, “error”, and “function”. They also happen to be the words used in the most unique posts. It’s no surprise that “function”, “card”, and “player” are amongst the most frequently used words because project 3 asks students to code functions related to cards and players, so describing a problem requires these words. What is more interesting, though, is why “error” is used so frequently. What aspects of errors do students find confusing? Let’s do a deeper dive into the actual questions to find out.        </div>
        <NetworkDiagram width={550} height={550} data={questionData} id={'one'} removedNodeIds={removedNodeIds} />
        <div className='text'>
          Each dot in the network graph represents one question asked in project 3 Winter 2023 that contains the word “error” in it. Any dots connected by a line have a similarity of above 60%. There are 9 groups of similar posts in just one subset of the project 3 questions, proving substantial existence of similar confusing concepts. Looking at the biggest group of similar questions, positioned in the bottom left of the graph, one can easily see what students find confusing. Students are unable to understand their error messages. It would be beneficial for us to provide resources for the students to help them understand their error messages. One potential resource is a list of common error messages to help students identify what error they might have and a breakdown of the typical error message. This would answer most student questions of “what does this error mean”. By providing these resources, staff can spend less time explaining error messages and more time helping students fix these error messages.         </div>
        <div className='text'>
          Error messages are an integral part of the Introduction to Programming course, thus are prevalent every semester. If students are confused on error messages in Winter 2023, are students in other semesters as well? Let’s find out.
        </div>
        <Boxplot width={550} height={550} data={boxplotData} removedNodeIds={removedNodeIds} title={'Winter 2023 Question Percentage Similarity Between Previous Semesters'} />
        <div className='text'>
          The graph above compares each question in the Winter 2023 semester to all questions in the previous semester and finds its max similarity in each semester. The distribution across semesters is fairly the same across semesters, with most posts falling in the 40% to 55% range. Questions that have this much similarity may be able to give students enough information to answer their own question. A quarter of the questions are nearly identical, falling in the 55% to 75% range. These are questions that instructors have to answer again and again each semester. Having questions this similar each semester reveals the amount of staff time wasted re answering questions. Returning to our previous example, every semester students are asking what error messages mean. By providing the proposed resource, student’s will feel more supported and successful semester after semester.        </div>
        <div className='text'>
        Analyzing student questions is not the only way we can find ways to improve the resources and teaching in the Introduction to Programming course. Instructor responses can also reveal what knowledge students are missing. Let’s do a deeper dive into the actual answers to find out.
        </div>
        <NetworkDiagram width={550} height={550} data={answerData} id={'two'} removedNodeIds={removedNodeIds} />
        <div className='text'>
          Looking at the second biggest interconnected chunk, all of those data points ask students to run their code in CAEN with the address sanitizer off. This is a very useful debugging technique in the course, especially when encountering errors. Because students must be directed to run their code in CAEN, it shows that the current resources on debugging errors does not emphasize that technique enough. The proposed resource discussed throughout this article could also include debugging strategies to use when encountering errors. Being able to more thoroughly attempt to fix errors allows instructors to spend less time on common errors and more time helping students debug complicated errors.        </div>
        <div className='text'>
          One of the most key observations to make is that, unlike the question node groups, answer node groups are very interconnected. This could be because instructors know the correct verbage to use for particular problems. The algorithm used to determine similarity in this article is a simple cosine similarity, which only compares the exact words used in each text. If a student doesn’t know the correct verbage to use, it would make searching for the answer on Piazza difficult because the search on piazza also only compares exact words. This would result in duplicate questions being asked without the students realizing. 
        </div>
        <div className='text'>
          A further point of research in this topic would be improving the algorithm used to determine similarity. A better algorithm than the cosine similarity would be the ability to semantically match text. This would allow the algorithm to highlight questions that are the same, even if the words used were different. 
        </div>
        <div className='text'>
          By investigating just a subsection of the questions asked in the Winter 2023 course, we were able to theorize new resources for the Introduction to Programming course that would benefit both students and instructors. Imagine the change we could make with a deeper dive into the project. 
        </div>
        <div className='text'>
        The visualizations in this article are below if you are interested in going deeper into this topic. I hope you found it as interesting as I do! Please feel free to contact me with any questions, comments, or concerns!
        </div>
        <div className='text'>
          <a href='https://www.linkedin.com/in/ann-stone-835264197/'>LinkedIn</a>
        </div>
      </div>
      <Dashboard />
    </div>
  );
}

export default App;
