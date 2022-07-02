import styled from 'styled-components';
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { mobile } from '../responsive';
import { Rerousel } from 'rerousel';

const Container = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    position: relative;
    overflow: hidden;
   
`;

const WIDTH = window.innerWidth

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${props => props.slideIndex * -props.sliderWidth}px);
`;
 

const Slide = styled.div`
    width: ${props => props.sliderWidth}px;
    height: 100%;
    display: flex;
    align-items: center;
    background-image: linear-gradient(to right, #${props => props.bg1}, #${props => props.bg2});
   

`;

const ImageContainer = styled.div`
    flex: 1;
    height: 100%;
    ${mobile({
        display:'none'
    })}
    
    

`;

const Image = styled.img`
    height: 95%;
    padding: 5px;
    border-radius: 5px;

   

`;

const InfoContainer = styled.div`
    flex:1
    padding: 50px;
    margin-left: 20px;
    

`;

const Title = styled.h1`
    font-size: 70px;
    color: white;
    ${mobile({
        fontSize: '24px',
      })} 
`;
const Description = styled.p`
    margin: 30px 0px;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 3px;
    color: white;
    ${mobile({
        display: 'none',
      })} 
    
    
`;
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.7s ease;

    &:hover{
        background-color: black;
        color: white;
    }

`;



const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0); 
    const [sliderWidth, setSliderWidth] = useState(window.innerWidth); 
    const [dataFetched, setDataFetched] = useState(false); 
    const slide1 = useRef(null);
  

    const handleClick = (direction) => {

        if (direction == "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex+1 : 0);
        }

    };

    const [data, setData] = useState([]);

    useEffect(() =>{
        getSliderData();
    }, []);

    const displayWindowSize = () => {
        setSliderWidth(window.innerWidth)
    }

    const getSliderData = async () => {
        await axios.get(process.env.REACT_APP_API_URL + "/api/slider/3").then(res => {
        setData(res.data.sliderData);
        setDataFetched(true)
        window.addEventListener("resize", displayWindowSize);
        
        console.log(res.data.sliderData);
        }).catch(err => console.log(err));
        
    }




  return (
    <Container>
        <Rerousel itemRef={slide1}>
            <Slide ref={slide1} sliderWidth={sliderWidth} bg1='0a0a0a'  bg2='0a0a0a'>
                    
                    
                <InfoContainer id='1'>
                    <Title style={{color:'white', fontSize:'90px'}}>New Products.</Title>
                    <Description></Description>
                    <Link to={"/products/"}>
                        <Button style={{backgroundColor:'white'}}>OUR SELECTION</Button>
                    </Link>
                </InfoContainer>

                
            </Slide>
        {data.map(item => (
                <Slide  sliderWidth={sliderWidth} bg1='808080'  bg2='5a5a5a'>
                    {dataFetched ? <>
                    
                    <ImageContainer>
                    <Image src={item.img}/>
                </ImageContainer>
                <InfoContainer id={item.img}>
                    <Title>{item.title}</Title>
                    <Description>{item.desc}</Description>
                    <Link to={"/product/"+item.id}>
                        <Button>DETAILS</Button>
                    </Link>
                </InfoContainer>
                </> : <></>}

                
            </Slide>

            ))}

        </Rerousel>
        
        {/* <Arrow direction="left" onClick={()=>handleClick("left")}>
            <BiLeftArrowAlt/>
        </Arrow>

        <Wrapper slideIndex={slideIndex} sliderWidth={sliderWidth}>

            {data.map(item => (
                <Slide sliderWidth={sliderWidth} bg={item.bg}>
                    {dataFetched ? <>
                    
                    <ImageContainer>
                    <Image src={item.img}/>
                </ImageContainer>
                <InfoContainer id={item.img}>
                    <Title>{item.title}</Title>
                    <Description>{item.desc}</Description>
                    <Link to={"/product/"+item.id}>
                        <Button>DETAILS</Button>
                    </Link>
                </InfoContainer>
                </> : <></>}

                
            </Slide>

            ))}
        </Wrapper>

        <Arrow direction="right" onClick={()=>handleClick("right")}>
            <BiRightArrowAlt/>
        </Arrow> */}
    </Container>
  )
}

export default Slider
