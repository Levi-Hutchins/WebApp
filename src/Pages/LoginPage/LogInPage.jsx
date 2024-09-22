import React from 'react'
import { useRef, useState, useEffect } from "react"
import Login from './components/LoginPortal';

const LogInPage = () => {

  const userRef = useRef();
  const errRef = useRef(); /*used for error handling and screen reading for accessibility*/ 

  // states for username
  const [user, setUser] = useState('');
  const [pword, setPword] = useState('');
  // state for error messaging and success
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pword])



  return (
    <div>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
      <h1>Log In</h1>
      <Login
      user={user}
      setUser = {setUser}
      pword={pword}
      setPword = {setPword}
      userRef = {userRef}      
      />
    </div>
  )
}

export default LogInPage;