// import React from 'react';
import styled from 'styled-components';
import { RiSendPlaneFill } from "react-icons/ri";
import { useRef, useState } from 'react';
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const Container = styled.div`
    height: 40vh;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;   
    flex-direction: column; 
`;

const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 15px;  
    color: white;  
`;

const Desc = styled.div`    
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;   
    color: white;  

`;

const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;

`;

const Input = styled.input`
    border: none; 
    flex: 8;   
    padding-left: 20px;
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


const Newsletter = () => {
  const emailRef = useRef(null);
  const [emailsuccess, setEmailSuccess] = useState(false)

  const handleClick = async () => {

    console.log(emailRef.current.value)
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/newsletter/addMember',  
        {
          email: emailRef.current.value,
        });
        setEmailSuccess(true);
        // console.log(res.data)
      } catch (error) {
        // console.log(error)     
      }

  }


  return (
    <Container>
        <Title>Newsletter.</Title>
        <Desc>Join to get updates on new arrivals and sales.</Desc>
        <InputContainer>
            <Input ref={emailRef} type='email' placeholder='Enter your email.'/>
            <Button onClick={() => handleClick()}>
                <RiSendPlaneFill/>
            </Button>
        </InputContainer>
        {emailsuccess? <span style={{color:'lightgray'}}>Thank you for subscribing!</span>: <></>}
    </Container>
  )
}

export default Newsletter
