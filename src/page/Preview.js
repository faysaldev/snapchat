import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { selectedImage } from '../features/appSlice';
import './Preview.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


function Preview() {

    const image = useSelector(selectedImage);
    const history = useHistory();

    const exite = () => {
            history.replace('/chats')
    }

    useEffect(() => {
        if (!image) {
        history.replace('/chats')
    }
    },[image])

    return (
        <div className='preview'>
            <div className="chat__timer">
            <CountdownCircleTimer
               isPlaying
                duration={10}
                size={60}
                strokeWidth={6}
               colors={[
               ['#004777', 0.33],
               ['#F7B801', 0.33],
               ['#A30000', 0.33],
               ]}
            >
            {({ remainingTime }) => {
                    if (remainingTime === 0) {
                        exite();
                    }
                        return remainingTime;
            }}
            </CountdownCircleTimer>

            </div>
            <img src={image} onClick={exite} />
        </div>
    )
}

export default Preview
