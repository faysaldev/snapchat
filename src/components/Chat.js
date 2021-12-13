import React, { forwardRef } from 'react'
import { Avatar } from '@material-ui/core'
import StopIcon from '@material-ui/icons/Stop';
import ReactTimeago from 'react-timeago';
import { useDispatch } from 'react-redux';
import {selectedImg} from '../features/appSlice'
import { useHistory } from 'react-router-dom';
import { db } from '../firebase';

const Chat=forwardRef(({ id, avatar, image, read, timestamp, username },ref)=> {
    
    const dispatch = useDispatch();
    const history = useHistory()
    
    const open = () => {
        dispatch(selectedImg(image));
        db.collection('posts').doc(id).update({
            read:true,
        })
        history.push('/chat/preview');
    }

    return (
        <div className="chat" onClick={open} ref={ref}>
            <Avatar src={avatar} alt={avatar} />
            <div className="chat__info">
                <h4>{username}</h4>
                <p>
                    Tap to view - {" "} {new Date(timestamp?.toDate()).toDateString()}
                </p>
            </div>

            {!read && <StopIcon className="chat__redIcon" />}
        </div>
    )
})

export default Chat
