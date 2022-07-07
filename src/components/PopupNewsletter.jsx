// import React from 'react';
import styled from 'styled-components';
import { RiSendPlaneFill } from "react-icons/ri";
import { useRef, useState } from 'react';
import axios from 'axios';
import { mobile } from '../responsive';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const Container = styled.div`
    height: 40vh;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;   
    flex-direction: column; 
    width: 100%;
`;

const Title = styled.h1`
    font-size: 40px;
    margin-bottom: 15px;  
    color: white;  
`;

const Desc = styled.div`    
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;   
    color: white; 
    ${mobile({
      marginLeft: '20px'
    })} 

`;

const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    display: flex;
    border-bottom: 1px solid lightgray;
    ${mobile({
      marginRight: '10px',
      marginLeft: '-80px',
    })} 

`;

const Input = styled.input`
    flex:3;
    border: none; 
    outline: none;
    color: white;
    font-size: 18px;
    background-color: black;

`;
const Button = styled.button`
    flex:1;
    border: none;

    background-color: black;
    color: white;
    &:hover{
        cursor: pointer;
      }
`;


const PopupNewsletter = () => {
  const emailRef = useRef(null);
  const [emailsuccess, setEmailSuccess] = useState(false)
  const [emailFailure, setEmailFailure] = useState(false)


  const handleClick = async () => {

    console.log(emailRef.current.value)
    try {
        const res = await axios.post(process.env.REACT_APP_API_URL + '/api/newsletter/addMember',  
        {
          email: emailRef.current.value,
        });
        setEmailSuccess(true);
        setEmailFailure(false)   ;  
        emailRef.current.value = '';

        // console.log(res.data)
      } catch (error) {
        setEmailFailure(true)   ;  
      }

  }


  return (
    <Container>
        <Title>Newsletter.</Title>
        <Desc>Join to get updates on new arrivals and sales.</Desc>
        <InputContainer>
            <Input ref={emailRef} type='email' placeholder='Enter your email.'/>
            <Button style={{backgroundColor:'black', border:'none'}} onClick={() => handleClick()}>
                <RiSendPlaneFill style={{backgroundColor:'black'}} size={30}/>
            </Button>
        </InputContainer>
        {emailsuccess? <p style={{color:'lightgray'}}>Thank you for subscribing!</p>: <></>}
        {emailFailure? <p style={{color:'red'}}>Something went wrong...try again.</p>: <></>}

    </Container>
  )
}

export default PopupNewsletter
