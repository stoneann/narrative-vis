import { useEffect, useState } from 'react';
import { parse } from 'papaparse';
import './WordCloud.css';
import * as d3 from "d3";
import { Legend } from "./Legend";

export function WordCloud({ handleWordClicked, wordClicked, dataPath }) {
    const fonts = [ 'font-xs', 'font-s', 'font-m', 'font-l', 'font-xl','font-xxl'];
    const numColors = 7
    const [data, setData] = useState();
    // const [minPosts, setMinPosts] = useState(0)
    // const [maxPosts, setMaxPosts] = useState(140)
    const numDisplayedWords = 100
    const [legend, setLegend] = useState(
        <div></div>
    )

    useEffect(() => {
        // Get data from CSV
        fetch( dataPath )
            .then( response => response.text() )
            .then( responseText => parse(responseText).data)
            .then( responseArray => {
                // Find the min and max frequencies
                let minCount = parseInt(responseArray[0][1]);
                let maxCount = 0;
                let minNumPosts = parseInt(responseArray[0][1]);
                let maxNumPosts = 0;

                for (let i = 0; i < numDisplayedWords; i++) {
                    if (isNaN(Math.max( parseInt(responseArray[i][1]), parseInt(maxCount) )) == false) {
                        maxCount = Math.max( parseInt(responseArray[i][1]), parseInt(maxCount) )
                    }
                    if (isNaN( Math.min(parseInt(responseArray[i][1]), parseInt(minCount))) == false) {
                        minCount =  Math.min(parseInt(responseArray[i][1]), parseInt(minCount))
                    }
                    if (isNaN(Math.max(parseInt(responseArray[i][2]), maxNumPosts)) == false) {
                        maxNumPosts = Math.max(parseInt(responseArray[i][2]), maxNumPosts)
                    }
                    if (isNaN(Math.min(parseInt(responseArray[i][2]), minNumPosts)) == false) {
                        minNumPosts = Math.min(parseInt(responseArray[i][2]), minNumPosts)
                    }
                }
                // Find the range and divide it by the number of fonts to get the number of frequencies per font size
                let increment = (maxCount - minCount) / fonts.length
                // Map each word to its size
                const colorScale = d3.scaleSequentialLog().domain([minNumPosts, maxNumPosts]).range(["#4292c6", "#08306b"])

                setData( responseArray.slice(0, numDisplayedWords).map((item) => {
                    return <div 
                    onClick={() => handleWordClicked(item[0])}
                    style={{
                        opacity: (wordClicked == '' || wordClicked == item[0]) ? 1 : 0.3,
                        color: colorScale(parseInt(item[2])), 
                    }}
                    className={`word ${fonts[parseInt(item[1]) === maxCount ? fonts.length - 1 : Math.floor((parseInt(item[1]) - minCount) / increment) ]}`}>
                        {item[0]}
                        </div>
                }) )
                setLegend((
                    <Legend 
                        title='# Posts with word' 
                        colorScale={colorScale}  />
                ))
            });
    }, [ wordClicked, dataPath])

    return (
        <div className='row max-height'>
            <div>
                {legend}
            </div>
            <div className='word-cloud'>
                {data}
            </div>
        </div>
    )
}