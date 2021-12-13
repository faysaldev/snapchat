import React,{useEffect, useState} from 'react'
import './Chats.css'
import { Avatar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { db,auth } from '../firebase';
import Chat from '../components/Chat'
import { useDispatch, useSelector } from 'react-redux';
import { selectedUser } from '../features/appSlice'
import FlipMove from 'react-flip-move';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router-dom';


function Chats() {

    const [posts, setposts] = useState([]);

    const history = useHistory()

    const user = useSelector(selectedUser);

    console.log(user.photoURL)

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setposts(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data:doc.data(),
                })))
            }) 
    },[])

    return (
        <div className="chats">
            <div className="chat__header">
                <Avatar className="avatar" style={{cursor:'pointer'}} onClick={()=> auth.signOut()} src={user?.photoURL} />
                <div className="chatHeader__search">
                    <SearchIcon className="searchIcon" />
                    <input type="text" placeholder="Search..." />
                </div>

                <ChatBubbleIcon className="chatBubbleIcon" />
            </div>


            <FlipMove className="chat__posts">
                {posts?.map(({ id, data: { avatar,image,read,timestamp,username} }) => (
                    <Chat id={id} key={id} avatar={avatar} image={image} read={read} timestamp={timestamp} username={username}/>
                ))}
            </FlipMove>


            <RadioButtonUncheckedIcon className="chat__takePhoto" onClick={()=> history.push('/')}/>
        </div>
    )
}

export default Chats
