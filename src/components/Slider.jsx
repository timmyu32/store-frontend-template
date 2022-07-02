import styled from 'styled-components';
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { mobile } from '../responsive';


const Container = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({
        height: '320px',
        width: '100%'
      })} 
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
    transform: translateX(${props => props.slideIndex * -WIDTH}px);
`;
 

const Slide = styled.div`
    width: ${WIDTH}px;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #c0c0c0;
    ${mobile({
        height: '200px'
      })} 

`;

const ImageContainer = styled.div`
    flex: 1;
    height: 100%;
    

`;

const Image = styled.img`
    height: 95%;
    padding: 5px;
    border-radius: 5px
    ${mobile({
        height: '99%',
        width: '200px'
      })} 

`;

const InfoContainer = styled.div`
    flex:1
    padding: 50px;
    margin-left: 20px;
    ${mobile({
        flex: 4,
      })} 

`;

const Title = styled.h1`
    font-size: 70px;
    ${mobile({
        fontSize: '24px',
      })} 
`;
const Description = styled.p`
    margin: 30px 0px;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 3px;
    ${mobile({
        margin: '5px 0px',
        fontSize: '10px',
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
    const [dataFetched, setDataFetched] = useState(false); 

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

    const getSliderData = async () => {
        await axios.get(process.env.REACT_APP_API_URL + "/api/slider/3").then(res => {
        setData(res.data.sliderData);
        setDataFetched(true)
        
        // console.log(res.data.sliderData);
        }).catch(err => console.log(err));
        
    }

    const handleEnvent = (href) => {
        window.location = href;
    }



  return (
    <Container>
        <Arrow direction="left" onClick={()=>handleClick("left")}>
            <BiLeftArrowAlt/>
        </Arrow>

        <Wrapper slideIndex={slideIndex}>

            {data.map(item => (
                <Slide bg={item.bg}>
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
        </Arrow>
    </Container>
  )
}

export default Slider
