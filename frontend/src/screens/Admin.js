import {React,useState} from 'react'
// import './Css/Admin.css'
const Admin = () => {
  const [Email,setEmail] = useState('');
  const [Password,setPassword] = useState('');
  const handleLogin =()=>{
    console.log(Email);
    console.log(Password);
    setEmail('');
    setPassword('');


  } 
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
          <h1>Login as admin</h1>
          <div className="loginsignup-fields">
            <input 
            type="email" 
            placeholder='Enter your E-mail'
            value={Email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
            type="password" 
            placeholder='Enter password'
            value={Password}
            onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default Admin