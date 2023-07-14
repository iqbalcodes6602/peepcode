import React, { useState } from 'react'

import "./Signup.css"
const Signup = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  return (
    <div id="signup" className='flex-col'>
      <h1>Signup</h1>
      <form className='signup-form' method="post" action='/signup' >

        <div className='subform'>
          <label htmlFor="email">Email: </label>
          <input valeu={email} onChange={(e) => setEmail(e.target.value)} type="text" name='email' placeholder='Your Email' />
        </div>

        <div className='subform'>
          <label htmlFor="password">Password: </label>
          <input value={password} onC hange={(e) => setPassword(e.target.value)} type="text" name='password' placeholder='Your Password' />
        </div>

        <button type="submit" id="test" onClick={async (e) => {
          e.preventDefault()
          const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            body: JSON.stringify({
              email: email,
              password: password,
            })
          })

          const json = response.json()
          console.log(json)
          alert("hello ther")
        }}>SUBMIT</button>

      </form>
    </div >
  )
}

export default Signup