import { useEffect, useState } from 'react';
import csvFilePath from './data/word-cloud-project3.csv';
import { parse } from 'papaparse';
import './WordCloud.css';
import * as d3 from "d3";
import { Legend } from "./Legend";

export function WordCloud({ handleWordClicked, wordClicked }) {
    const fonts = ['font-xxs', 'font-xs', 'font-s', 'font-m', 'font-l', 'font-xl','font-xxl'];
    const numColors = 7
    const [data, setData] = useState();
    const colors = d3.schemeBlues[numColors];
    const [minPosts, setMinPosts] = useState(0)
    const [maxPosts, setMaxPosts] = useState(140)
    const numDisplayedWords = 100

    useEffect(() => {
        // Get data from CSV
        fetch( csvFilePath )
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
                let numPostsIncrement = (maxNumPosts - minNumPosts) / numColors
                // Map each word to its size
                setMaxPosts(maxNumPosts)
                setMinPosts(minNumPosts)
                setData( responseArray.slice(0, numDisplayedWords).map((item) => {
                    return <div 
                    onClick={() => handleWordClicked(item[0])}
                    style={{
                        opacity: (wordClicked == '' || wordClicked == item[0]) ? 1 : 0.3,
                        color: colors[ (parseInt(item[2]) === maxNumPosts || wordClicked == item[0]) ? numColors - 1 : Math.floor((parseInt(item[2]) - minNumPosts) / numPostsIncrement ) 
                    ]}}
                    className={`word ${fonts[parseInt(item[1]) === maxCount ? fonts.length - 1 : Math.floor((parseInt(item[1]) - minCount) / increment) ]}`}>
                        {item[0]}
                        </div>
                }) )
            });
    }, [maxPosts, minPosts, wordClicked])

    return (
        <div className='row max-height'>
            <div>
            <Legend 
                title='# Posts with word' 
                minNumPosts={minPosts}
                maxNumPosts={maxPosts}
                numPostsIncrement={(maxPosts - minPosts) / numColors}
                colors={colors}  />
            </div>
            <div className='word-cloud'>
                {data}
            </div>
        </div>
    )
}