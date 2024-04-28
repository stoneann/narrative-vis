import './Dashboard.css';
import { WordCloud } from './WordCloud';
import data from './data/network-graph-error-student.json';
import instructorData from './data/network-graph-error-answer.json';
import boxplotData from './data/boxplot.json';
import { NetworkDiagram } from './NetworkGraph';
import { Boxplot } from './BoxPlot';
import { useState } from 'react';


function Dashboard() {

    const [wordClicked, setWordClicked] = useState('');

    const handleWordClick = (word) => {
        setWordClicked(word)
    }

    return (
        <div className='column'>
            <div className='row'>                
                <WordCloud handleWordClicked={handleWordClick} wordClicked={wordClicked}/>
            </div>
            <div className='row'>
                <NetworkDiagram width={550} height={550} data={data} id={'one'} />
                <Boxplot width={550} height={550} data={boxplotData} />
            </div>
            <div className='row'>
                <NetworkDiagram width={550} height={550} data={data} id={'one'} />
                <Boxplot width={550} height={550} data={boxplotData} />
            </div>
        </div>
    )
}

export default Dashboard;