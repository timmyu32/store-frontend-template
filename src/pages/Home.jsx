// import React from 'react'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { showPopUp } from '../redux/userRedux'
import Popup from '../components/Popup'
import styled from 'styled-components'


const Button = styled.button`
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 20px;
    background-color: white;
    transition: all 0.5s ease;
    cursor: pointer;
    font-weight: 600;

    &:hover{
        background-color: black;
        color: white;
    }
`;

const Home = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() =>{
    window.scrollTo(0, 0);

  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    dispatch(showPopUp());

  }

  // console.log(isOpen)
  // console.log(user)
  // console.log(user.initialPopUpShown)

  return (
    <div>
        <Navbar/>
        <br />
        <br />
        <br />
        <Announcement/>
        {isOpen  && (user.initialPopUpShown == 0) && <Popup
        content={<>
          <Newsletter/>
        </>}
        handleClose={() => togglePopup()}
      />}
        <Slider/>
        <Categories/>
        <Newsletter/>
        <Products limit={6}/>
        <Link to={'/products'}>
        <Button>Continue</Button>
        </Link>
        <Footer/>
    </div>
  )
}

export default Home
