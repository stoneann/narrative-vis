import './Dashboard.css';
import { WordCloud } from './WordCloud';
import data from './data/nodes_and_links/question/W23/project3.json';
import answerData from './data/nodes_and_links/answer/W23/project3.json';
import boxplotData from './data/max_similarity/question/project3.json';
import boxplotAnswerData from './data/max_similarity/answer/project3.json';
import { NetworkDiagram } from './NetworkGraph';
import idData from './data/ids.json';
import { Boxplot } from './BoxPlot';
import { useState, useEffect } from 'react';

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
    const { height, width } = useWindowDimensions();
    const [wordClicked, setWordClicked] = useState('')
    const [removedNodeIds, setRemovedNodeIds] = useState([])

    const handleWordClick = (newWord) => {
        setWordClicked(newWord)

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
    }

    return (
        <div className='column margin gray'>
            <h1>Dashboard</h1>
            <div className='row'>                
                <WordCloud handleWordClicked={handleWordClick} wordClicked={wordClicked}/>
            </div>
            <div className='row'>
                <NetworkDiagram width={width*0.55} height={550} data={data} removedNodeIds={removedNodeIds} id={'dashboard-question'} />
                <Boxplot width={400} height={550} data={boxplotData} removedNodeIds={removedNodeIds} title={'Winter 2023 Question Percentage Similarity Between Previous Semesters'} />
            </div>
            <div className='row'>
                <NetworkDiagram width={width*0.55} height={550} data={answerData} removedNodeIds={removedNodeIds} id={'dashboard-answer'} />
                <Boxplot width={400} height={550} data={boxplotAnswerData} removedNodeIds={removedNodeIds} title={'Winter 2023 Answer Percentage Similarity Between Previous Semesters'} />
            </div>
        </div>
    )
}

export default Dashboard;