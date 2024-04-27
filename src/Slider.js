import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import './Slider.css';

export default function ContinuousSlider() {
  const [value, setValue] = React.useState(30);
  const [show, setShow] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleConfirmation = () => {
    setValue(5364)
    setShow(true)
  }

  return (
    <div className='column'>
        <div className='slider'>
                {show &&
                    <h2>5364</h2>
                }
                <Slider 
                aria-label="Volume" 
                value={value} 
                onChange={handleChange}   
                min={10}
                max={10000}
                valueLabelDisplay="auto"
                />
                {/* <div className='button'> */}
                    <Button className='button' variant="contained" onClick={handleConfirmation}>Check</Button>    
                {/* </div> */}
            </div>
    </div>
  );
}