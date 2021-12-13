import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { auth, provider } from '../firebase'
import './Login.css'
import {login} from '../features/appSlice'

function Login() {

    const dispatch = useDispatch();

    const signIn = () => {
        auth.signInWithPopup(provider).then(({ user }) => {
            dispatch(login(user))
        }).catch((err) => alert(err))
    }

    return (
        <div className="login">
            <div className="login__contant">
                <img src="/logo.png" alt="" />
                <Button variant='outlined' onClick={signIn}>Sign In</Button>
            </div>
        </div>
    )
}

export default Login

