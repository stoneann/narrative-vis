import { useEffect, useState } from 'react';
import csvFilePath from './small-data/word-cloud.csv';
import { parse } from 'papaparse';
import './WordCloud.css';

export function WordCloud() {
    const fonts = ['font-xxs', 'font-xs', 'font-s', 'font-m', 'font-l', 'font-xl','font-xxl'];
    const [data, setData] = useState();

    useEffect(() => {
        // Get data from CSV
        fetch( csvFilePath )
            .then( response => response.text() )
            .then( responseText => parse(responseText).data)
            .then( responseArray => {
                // Find the min and max frequencies
                let minNum = responseArray[0][1];
                let maxNum = 0;
                for (let i = 0; i < responseArray.length; i++) {
                    maxNum = Math.max(responseArray[i][1], maxNum)
                    minNum = Math.min(responseArray[i][1], minNum)
                }
                // Find the range and divide it by the number of fonts to get the number of frequencies per font size
                let increment = (maxNum - minNum) / fonts.length
                // Map each word to its size
                setData( responseArray.map((item) => {
                    return <div className={`word ${fonts[item[1] == maxNum ? fonts.length - 1 : Math.floor((item[1] - minNum) / increment) ]}`}>{item[0]}</div>
                }) )
            });
    }, [])
    return (
        <div className='word-cloud'>
            {data}
        </div>
    )
}