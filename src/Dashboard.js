import './Dashboard.css';
import { WordCloud } from './WordCloud';
import data from './data/network-graph-project3.json';
import answerData from './data/network-graph-project3-answer.json';
import boxplotData from './data/boxplot.json';
import { NetworkDiagram } from './NetworkGraph';
import { Boxplot } from './BoxPlot';
import { useState } from 'react';


function Dashboard() {

    const [wordClicked, setWordClicked] = useState('')
    const [removedNodeIds, setRemovedNodeIds] = useState([])

    const handleWordClick = (newWord) => {
        setWordClicked(newWord)

        var list = []

        for (var i = 0; i < data.nodes.length; i++) {
            var words = data.nodes[i].processedValue.split(" ")
            var found = false
            words.forEach((word) => {
                if (word == newWord) {
                    found = true
                }
            })
            if (!found) {
                list.push(data.nodes[i].id)
            }
        }
        
        setRemovedNodeIds(list);
    }

    return (
        <div className='column'>
            <div className='row'>                
                <WordCloud handleWordClicked={handleWordClick} wordClicked={wordClicked}/>
            </div>
            <div className='row'>
                <NetworkDiagram width={550} height={550} data={data} removedNodeIds={removedNodeIds} id={'dashboard-question'} />
                <Boxplot width={550} height={550} data={boxplotData} />
            </div>
            <div className='row'>
                <NetworkDiagram width={550} height={550} data={answerData} removedNodeIds={removedNodeIds} id={'dashboard-answer'} />
                <Boxplot width={550} height={550} data={boxplotData} />
            </div>
        </div>
    )
}

export default Dashboard;