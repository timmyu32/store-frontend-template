import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from '../redux/userRedux';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';


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
    flex-direction: column;
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

const Error = styled.span`
  color: red;
`;

const RegisterLink = styled.a`
  color: black;
  a:link { text-decoration: none; }
  a:visited { text-decoration: none; color: black;}
  a:hover { text-decoration: none; }
  a:active { text-decoration: none; }
  cursor: pointer;
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const {isFetching, error} = useSelector((state) => state.user);



  useEffect(() =>{
    noDefault();
    window.scrollTo(0, 0);
    
  }, []);

  const noDefault = () => {
      document.getElementById("form").addEventListener("click", function(event){
          event.preventDefault()
        })
  };

  const uNameRef = useRef(null);
  const pWordRef = useRef(null);

  const handleClick = () => {
    dispatch(loginStart())
      if(pWordRef.current.value!= undefined){
          const data = {
              username: uNameRef.current.value,
              password: pWordRef.current.value,
          };

          // console.log(data)

          axios.post("https://depop-shop-api-v1.herokuapp.com/api/login", {
              username: uNameRef.current.value,
              password: pWordRef.current.value,
          }).then(res => {
          console.log(res);
          dispatch(loginSuccess(res.data))
          history('/', res.data)   
          }).catch(err => alert('Incorrect Credentials'));

      }else{
        dispatch(loginFailure())
          // alert("Passwords do not match, try again.")
      }
    }



  return (
    <Container>
      <Wrapper>
        <Title>LOGIN TO TallgrassVintage STORE</Title>
        <Form id='form'>
          <Input ref={uNameRef} placeholder="Username"/>
          <Input type='password' ref={pWordRef} placeholder="Password"/>
          {error && <Error>Incorrect Credentials</Error>}
          <RegisterLink onClick={() => history('/register')}>Don't have an account? Cick here to register.</RegisterLink>
          <Button onClick={() =>handleClick()}>Login</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default SignIn
