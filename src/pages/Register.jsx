import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    rgba(255,255,255,0.9),
    rgba(255,255,255,0.9)
  ),  
  url('https://media-pictures.depop.com/b0/12546449/1165291087_d003df74d1e34b408a4d7d9e6d95f825/U1.jpg');
    center;
  `;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;  
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
    color: black;
    font-size: 18px;
    font-weight: 500;
`

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    cursor: pointer;
`
const AdminLink = styled.a`
    &:visited{
      color: black
    }
    &:link{
      color: black
    }
    &:active {
      color: black;
    }
`;




const Register = (props) => {

    useEffect(() =>{
        noDefault();
        window.scrollTo(0, 0);

    }, []);
    
    const noDefault = () => {
        document.getElementById("form").addEventListener("click", function(event){
            event.preventDefault()
          })
    };

    const fNameRef = useRef(null);
    const lNameRef = useRef(null);
    const emailRef = useRef(null);
    const uNameRef = useRef(null);
    const pWordRef = useRef(null);
    const confirmRef = useRef(null);
    const secretKeyRef = useRef(null);


     const handleClick = () => {
        const data = {
                  firstname: fNameRef.current.value,
                  lastname: lNameRef.current.value,
                  username: uNameRef.current.value,
                  email: emailRef.current.value,
                  password: pWordRef.current.value,
              };
        if(pWordRef.current.value == confirmRef.current.value && data.firstname && data.lastname && data.username && data.email && data.password ){
            

            console.log(window.location.pathname)
            if(window.location.pathname == '/register/admin'){
              axios.post("http://127.0.0.1:8000/api/register/admin", {
                firstname: fNameRef.current.value,
                lastname: lNameRef.current.value,
                username: uNameRef.current.value,
                email: emailRef.current.value,
                password: pWordRef.current.value,
                secretKey: secretKeyRef.current.value,
              })
              .then(res => {
                console.log(res);
                if (res.data.message != 'incorrect admin cred'){
                  window.location = '/login';
                }else{
                  alert('INCORRECT ADMIN CREDENTIALS')
                }
              })
              .catch(err => console.log(err));
            }else{
              axios.post("http://127.0.0.1:8000/api/register", {
                firstname: fNameRef.current.value,
                lastname: lNameRef.current.value,
                username: uNameRef.current.value,
                email: emailRef.current.value,
                password: pWordRef.current.value,
              })
              .then(res => {
                window.location = '/login';
              })
              .catch(err => console.log(err));
            }
            

        }else{
            alert("Passwords do not match, try again.")
        }
      }

    const adminInput = () => {
      if(window.location.pathname == '/register/admin'){
        return <Input ref={secretKeyRef} placeholder="Secret Key"/>
      }
    }

    const adminLink = () => {
      if(window.location.pathname == '/register/admin'){
        return <AdminLink href="register/admin">Admin</AdminLink>
      }else{
        return <AdminLink href="register/admin">Admin</AdminLink>
        
      }
    }

    

  return (
    <div>
      <Container>
        <Wrapper>
          <Title>CREATE ACCOUNT WITH TallgrassVintage</Title>
          <Form id='form'>
            <Input ref={fNameRef} placeholder="First Name"/>
            <Input ref={lNameRef} placeholder="Last Name"/>
            <Input type='email' ref={emailRef} placeholder="email"/>
            <Input ref={uNameRef} placeholder="Username"/>
            <Input type='password' ref={pWordRef} placeholder="Password"/>
            <Input type='password' ref={confirmRef} placeholder="Confirm Password"/>
            { adminInput()  }
           
            
            <Agreement>
              By creating an account, I consent to the processing of my personal data in 
              accordance with the <b>PRIVACY POLICY</b>.
            </Agreement>
          </Form >
          <Button onClick={() =>handleClick()}>CREATE ACCOUNT</Button>
            <h3>*After creating an account you will be redirected to login.</h3>
        </Wrapper>
      </Container>
      { adminLink() }    
    <Footer/>
    </div>
  )
}

export default Register
