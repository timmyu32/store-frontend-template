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
    font-size: 70px;
    margin-bottom: 15px;  
    color: white;  
`;

const Desc = styled.div`    
    font-size: 24px;
    font-weight: 300;
    color: white; 
    ${mobile({
      marginLeft: '20px'
    })} 

`;

const Sub = styled.div`    
    font-size: 20px;
    font-weight: 300;
    color: white; 
    ${mobile({
      marginLeft: '20px'
    })} 

`;
const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    ${mobile({
      marginRight: '10px'
    })} 

`;

const Input = styled.input`
    border: none; 
    flex: 8;   
    padding-left: 20px;
    outline: none;
    color: white;
    font-size: 18px;
    background-color: black;

`;
const Button = styled.button`
    flex:1;
    margin-left: -30px;
    border: none;

    background-color: black;
    color: white;

    &:hover{
        cursor: pointer;
      }
`;


const Newsletter = () => {
  const emailRef = useRef(null);
  const [emailSuccess, setemailSuccess] = useState(false)
  const [emailFailure, setEmailFailure] = useState(false)


  const handleClick = async () => {

    console.log(emailRef.current.value)
    try {
        const res = await axios.post(process.env.REACT_APP_API_URL + '/api/newsletter/addMember',  
        {
          email: emailRef.current.value,
        });
        setemailSuccess(true);
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
        <Desc>15% off your first order.</Desc>
        <Sub>Join to get updates on new arrivals and sales.</Sub>

        <InputContainer>
            <Input ref={emailRef} type='email' placeholder='Enter your email.'/>
            <Button onClick={() => handleClick()}>
                <RiSendPlaneFill size={30}/>
            </Button>
        </InputContainer>
        {emailSuccess? <span style={{color:'lightgray'}}>Thank you for subscribing!</span>: <></>}
        {emailFailure? <span style={{color:'red'}}>Something went wrong...try again.</span>: <></>}

    </Container>
  )
}

export default Newsletter
