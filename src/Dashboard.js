import './Dashboard.css';
import { WordCloud } from './WordCloud';
import { NetworkDiagram } from './NetworkGraph';
import { Boxplot } from './BoxPlot';
import { useState, useEffect } from 'react';

import idProject1 from './data/ids/project1.json';
import idProject2 from './data/ids/project2.json';
import idProject3 from './data/ids/project3.json';
import idProject4 from './data/ids/project4.json';
import idProject5 from './data/ids/project5.json';

import boxplotAnswerProject1 from './data/max_similarity/answer/project1.json';
import boxplotAnswerProject2 from './data/max_similarity/answer/project2.json';
import boxplotAnswerProject3 from './data/max_similarity/answer/project3.json';
import boxplotAnswerProject4 from './data/max_similarity/answer/project4.json';
import boxplotAnswerProject5 from './data/max_similarity/answer/project5.json';

import boxplotQuestionProject1 from './data/max_similarity/question/project1.json';
import boxplotQuestionProject2 from './data/max_similarity/question/project2.json';
import boxplotQuestionProject3 from './data/max_similarity/question/project3.json';
import boxplotQuestionProject4 from './data/max_similarity/question/project4.json';
import boxplotQuestionProject5 from './data/max_similarity/question/project5.json';

import nodesAndLinksQuestionProject1 from './data/nodes_and_links/question/W23/project1.json';
import nodesAndLinksQuestionProject2 from './data/nodes_and_links/question/W23/project2.json';
import nodesAndLinksQuestionProject3 from './data/nodes_and_links/question/W23/project3.json';
import nodesAndLinksQuestionProject4 from './data/nodes_and_links/question/W23/project4.json';
import nodesAndLinksQuestionProject5 from './data/nodes_and_links/question/W23/project5.json';

import nodesAndLinksAnswerProject1 from './data/nodes_and_links/answer/W23/project1.json';
import nodesAndLinksAnswerProject2 from './data/nodes_and_links/answer/W23/project2.json';
import nodesAndLinksAnswerProject3 from './data/nodes_and_links/answer/W23/project3.json';
import nodesAndLinksAnswerProject4 from './data/nodes_and_links/answer/W23/project4.json';
import nodesAndLinksAnswerProject5 from './data/nodes_and_links/answer/W23/project5.json';

import wordFrequencyProject1 from './data/word_frequency/W23/project1.csv';
import wordFrequencyProject2 from './data/word_frequency/W23/project2.csv';
import wordFrequencyProject3 from './data/word_frequency/W23/project3.csv';
import wordFrequencyProject4 from './data/word_frequency/W23/project4.csv';
import wordFrequencyProject5 from './data/word_frequency/W23/project5.csv';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
  }

function Dashboard() {
    const nodesAndLinksAnswer = [nodesAndLinksAnswerProject1, nodesAndLinksAnswerProject2, nodesAndLinksAnswerProject3, nodesAndLinksAnswerProject4, nodesAndLinksAnswerProject5]
    const nodesAndLinksQuestion = [nodesAndLinksQuestionProject1, nodesAndLinksQuestionProject2, nodesAndLinksQuestionProject3, nodesAndLinksQuestionProject4, nodesAndLinksQuestionProject5]
    const wordFrequency = [wordFrequencyProject1, wordFrequencyProject2, wordFrequencyProject3, wordFrequencyProject4, wordFrequencyProject5]
    const ids = [idProject1, idProject2, idProject3, idProject4, idProject5]
    const boxplotAnswer = [boxplotAnswerProject1, boxplotAnswerProject2, boxplotAnswerProject3, boxplotAnswerProject4, boxplotAnswerProject5]
    const boxplotQuestion = [boxplotQuestionProject1, boxplotQuestionProject2, boxplotQuestionProject3, boxplotQuestionProject4, boxplotQuestionProject5]
    const [project, setProject] = useState(2);
    const projects = [0, 1, 2, 3, 4]

    const { height, width } = useWindowDimensions();
    const [wordClicked, setWordClicked] = useState('')
    const [removedNodeIds, setRemovedNodeIds] = useState([])

    const handleWordClick = (newWord) => {
        if (wordClicked == newWord) {
            setWordClicked('')
            newWord = ''
            setRemovedNodeIds([])
        } else {
            setWordClicked(newWord)
            var list = []

            for (var i = 0; i < ids[project].length; i++) {
                var words = ids[project][i].value.split(" ")
                var found = false
                words.forEach((word) => {
                    if (word == newWord) {
                        found = true
                    }
                })
                if (!found) {
                    list.push(ids[project][i].id)
                }
            }
            
            setRemovedNodeIds(list);
        }
    }

    return (
        <div className='column padding gray'>
            <h1>Exploration</h1>
            <div className='row'> 
                <div className="column padding-small margin-right select">
                    <div className='white padding-small center column'>
                    <h3 className='center-text'>Select a Project:</h3> 
                      <select className="dropdown"
                        onChange={(e) => setProject(e.target.value - 1)}
                        defaultValue={project + 1}
                      >
                        {projects.map(it => <option key={it}>{it + 1}</option>)}
                    </select>
                    </div>
                </div> 
                <div className='white padding-small'>
                    <WordCloud handleWordClicked={handleWordClick} wordClicked={wordClicked} dataPath={wordFrequency[project]} />
                </div>              
            </div>
            <div className='row'>
                <div className='white margin-top margin-right padding-small center'>
                    <NetworkDiagram width={width*0.55} height={550} data={nodesAndLinksQuestion[project]} removedNodeIds={removedNodeIds} id={'dashboard-question'} />
                </div>
                <div className='white margin-top padding-small'>
                    <Boxplot width={400} height={550} data={boxplotQuestion[project]} removedNodeIds={removedNodeIds} title={'Winter 2023 Question Percentage Similarity Between Previous Semesters'} />
                </div>
            </div>
            <div className='row'>
                <div className='white margin-top margin-right padding-small center'>
                    <NetworkDiagram width={width*0.55} height={550} data={nodesAndLinksAnswer[project]} removedNodeIds={removedNodeIds} id={'dashboard-answer'} />
                </div>
                <div className='white margin-top padding-small'>
                    <Boxplot width={400} height={550} data={boxplotAnswer[project]} removedNodeIds={removedNodeIds} title={'Winter 2023 Answer Percentage Similarity Between Previous Semesters'} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;