import {React,useState} from 'react'
import './Css/Login.css'

const Login = () => {
  const [Email,setEmail] = useState('');
  const [Password,setPassword] = useState('');
  const handleLogin =(e)=>{
    e.preventDefault();
    if (validate()) {
        // let inputobj={"Email": Email,
        // "password": Password};
        fetch("http://localhost:3500/user",{
            method:'Get',
            headers:{'content-type':'application/json'},
            // body:JSON.stringify(inputobj)
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp)
            if (Object.keys(resp).length === 0) {
                console.log('Login failed, invalid credentials');
            }else{
              console.log('Success');
               
            }
        }).catch((err) => {
          console.log('Login Failed due to :' + err.message);
        });
    }
}
  const validate = () => {
    let result = true;
    if (Email === '' || Email === null) {
        result = false;
        console.log('Please Enter Username');
    }
    if (Password === '' || Password === null) {
        result = false;
        console.log('Please Enter Password');
    }
    return result;
    }
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
          <h1>Login</h1>
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

export default Login