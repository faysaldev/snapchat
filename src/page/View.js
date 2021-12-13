import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { selectImage } from '../features/photoSlice'
import CloseIcon from '@material-ui/icons/Close';
import './View.css';
import { resetImg } from '../features/photoSlice'
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuid } from 'uuid';
import { storage, db } from '../firebase'
import firebase from 'firebase';
import { selectedUser } from '../features/appSlice'

function View() {

    const user = useSelector(selectedUser);

    const imge = useSelector(selectImage);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!imge) {
            history.replace('/')
        }
    }, [imge, history]);

    const sendPhoto = () => {
        const id = uuid();

        const uploadTask = storage.ref(`images/${id}`)
            .putString(imge, "data_url");
        uploadTask.on("state_changed", null,
            (error) => {
                console.log(error)
            },() => {
                storage.ref('images').child(id).getDownloadURL()
                    .then((url) => {
                        db.collection('posts').add({
                            image: url,
                            username: user.displayName,
                            avatar: user.photoURL,
                            read: false,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        });
                    
                        history.replace('/chats')

                })
                    .catch((error) => console.log(error))
            }
           
        )

    }


    return (
        <div className="viewPage">
            <CloseIcon onClick={() => dispatch(resetImg())} className="closeIcon" />
            
            <div className="toptollBar__right">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={imge} />
            <div className="view__fotter" onClick={sendPhoto}>
                <h3>Send Now</h3>
                <SendIcon fontSize="small" className="sendIcon" />
            </div>
        </div>
    )
}

export default View
