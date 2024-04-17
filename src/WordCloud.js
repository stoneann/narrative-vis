import { useEffect, useState } from 'react';
import csvFilePath from './small-data/word-cloud.csv';
import { parse } from 'papaparse';
import './WordCloud.css';
import * as d3 from "d3";
import { Legend } from "./Legend";

export function WordCloud() {
    const fonts = ['font-xxs', 'font-xs', 'font-s', 'font-m', 'font-l', 'font-xl','font-xxl'];
    const numColors = 7
    const [data, setData] = useState();
    const colors = d3.schemeBlues[numColors];
    const [minPosts, setMinPosts] = useState(0)
    const [maxPosts, setMaxPosts] = useState(140)

    useEffect(() => {
        // Get data from CSV
        fetch( csvFilePath )
            .then( response => response.text() )
            .then( responseText => parse(responseText).data)
            .then( responseArray => {
                // Find the min and max frequencies
                let minCount = responseArray[0][1];
                let maxCount = 0;
                let minNumPosts = responseArray[0][1];
                let maxNumPosts = 0;

                for (let i = 0; i < responseArray.length; i++) {
                    maxCount = Math.max(responseArray[i][1], maxCount)
                    minCount = Math.min(responseArray[i][1], minCount)
                    maxNumPosts = Math.max(responseArray[i][2], maxNumPosts)
                    minNumPosts = Math.min(responseArray[i][2], minNumPosts)
                }
                // Find the range and divide it by the number of fonts to get the number of frequencies per font size
                let increment = (maxCount - minCount) / fonts.length
                let numPostsIncrement = (maxNumPosts - minNumPosts) / numColors
                // Map each word to its size
                setMaxPosts(maxNumPosts)
                setMinPosts(minNumPosts)
                setData( responseArray.map((item) => {
                    return <div 
                    style={{color: colors[ item[2] == maxNumPosts ? numColors - 1 : Math.floor((item[2] - minNumPosts) / numPostsIncrement ) ]}}
                    className={`word ${fonts[item[1] == maxCount ? fonts.length - 1 : Math.floor((item[1] - minCount) / increment) ]}`}>
                        {item[0]}
                        </div>
                }) )
            });
    }, [maxPosts, minPosts])

    return (
        <div className='column'>
            <div className='word-cloud'>
                {data}
            </div>
                <Legend 
                title='Number of Posts That Contain the Word' 
                minNumPosts={minPosts}
                maxNumPosts={maxPosts}
                numPostsIncrement={(maxPosts - minPosts) / numColors}
                colors={colors}  />
        </div>
    )
}