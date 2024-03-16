import { useState } from "react"
import axios from "axios";
import {useCookies} from 'react-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form , Button } from "react-bootstrap"
import "./App.css"

const Auth = ()=>
{ 
    const [cookies,setCookies]=useCookies(["access_token"])
    const logout = ()=>{
        setCookies("access_token","")
        window.localStorage.removeItem("user_id")
        window.location.reload(false)

    }
    return(
    <>
        
       { cookies.access_token
        ? <Button variant="danger" onClick={logout}>Logout</Button>
        :(<>
         <Register/>
         <Login />
         </>
    )
       }
    </>)
}


const Register =()=>{
    const [username,SetUsername]=useState("")
    const [password,SetPassword]=useState("")
    const onSubmit =async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:3001/register",{username,password})
        alert("admin created")
    }
return(
    <Forma 
    label="Register"
    username={username}
    password={password}
    SetUsername={SetUsername}
    SetPassword={SetPassword}
    onSubmit={onSubmit}
    
    />
)
}
const Login =()=>{
    const [username,SetUsername]=useState("")
    const [password,SetPassword]=useState("")
    const [_,setCookies]=useCookies(["access_token"])
    const onSubmit =async(e)=>{
        e.preventDefault();
        const resp= await axios.post("http://localhost:3001/login",{username,password})
        setCookies("access_token",resp.data.token)
        window.localStorage.setItem("user_id",resp.data.adminid)
        window.location.reload(false)

        console.log(resp)
    }

    return(
        <Forma 
        label="Login"
        username={username}
        password={password}
        SetUsername={SetUsername}
        SetPassword={SetPassword}
        onSubmit={onSubmit}
       
        />
    )
    
}

const Forma = ({label,username,password,SetUsername,SetPassword,onSubmit})=>{
return(
    <Container>
        <Form className='form' onSubmit={onSubmit}>
        <h2 className="text-white">{label} </h2>
      <Form.Control type="text" placeholder="name" value={username} onChange={e=>SetUsername(e.target.value)}  />
      
      <Form.Control type="text" placeholder="password" value={password}  onChange={e=>SetPassword(e.target.value)}  />
      
        <Button variant="warning"  type="submit">{label}</Button>
        
        </Form>
        

        </Container>
)}
export default Auth