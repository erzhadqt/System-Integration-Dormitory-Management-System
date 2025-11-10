// https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbHNtRXVfR2ZsaTNReU5OYjBTU0VDOGtWQmFYQXxBQ3Jtc0tsU0xDMUlfb0hsekI4amF4N2ZwVWIxVDRQLThrd2J1RzhHdzZsYkZFT05VazNybWpacTNUQmRoWWJ6N3Fhai1ROFFqaWh6UjFYZDJETVpoZXIzTXVVbWxoMXE1LTRRM3hEUXVWQUUyMDUtckpKVUV0OA&q=https%3A%2F%2Fgithub.com%2FMomenSherif%2Freact-oauth%2Fissues%2F12&v=GuHN_ZqHExs

import React from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

import { useNavigate } from 'react-router-dom'

const GoogleAuth = () => {
  const navigate = useNavigate()

  function handleLogout() {
    googleLogout()
  }

  return (
    <>
        <GoogleLogin onSuccess={(credentialResponse) => {
            console.log(credentialResponse)
            console.log(jwtDecode(credentialResponse.credential))
            navigate("/tenant-homepage")
        }} 
        onError={() => alert("Login Failed")} auto_select={true} theme="outline" shape="pill" size="large" text="signin_with"  width="280"/>
    </>
  )
}

export default GoogleAuth