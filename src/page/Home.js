import React, { useRef, useCallback, useState } from 'react'
import './Home.css'
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux'
import {setImg} from '../features/photoSlice'
import { useHistory } from 'react-router-dom';

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user"
};


function Home() {

    const webcamRef = React.useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const capture = useCallback( () => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setImg(imageSrc));
        history.push('/view')
    },
        
    [webcamRef]);



    return (
        <div className="home">
            <Webcam
            audio={false}
            height={videoConstraints.height}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={videoConstraints.width}
            videoConstraints={videoConstraints}
            />
            
            <RadioButtonUncheckedIcon className="photo__captureBtn" onClick={capture} />
        </div>
    )
}

export default Home
