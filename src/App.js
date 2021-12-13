import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './page/Home';
import View from './page/View';
import Chats from './page/Chats';
import Preview from './page/Preview';
import { useDispatch, useSelector } from 'react-redux';
import { selectedUser } from './features/appSlice'
import Login from './page/Login';
import { auth } from './firebase';
import {login,logout} from './features/appSlice'


function App() {

  const user = useSelector(selectedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login(authUser))
      } else {
        dispatch(logout())
      }
    })
  },[])


  return (
    <div className="app">
      <Router>
        {!user ? <Login /> : (
            <>
          <img src="/logo.png" className="logo" alt="" />
          <div className="app__body" style={{backgroundImage:"url('/bg.png')"}}>
              <div className="appBody__bg">
              <Switch>

              <Route path="/view">
              <View />
              </Route>

              <Route path="/chats">
              <Chats />
              </Route>

              <Route path="/chat/preview">
              <Preview />
              </Route>

              <Route exact path="/">
              <Home />
              </Route>
              </Switch>
            </div>
          </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

