// import React from 'react'
import styled from 'styled-components';
import { FiShoppingCart } from "react-icons/fi";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { addProduct } from '../redux/cartRedux';



const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    transition: all 0.69s ease;
    

`;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 350px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eae8e8;
    position: relative;
    a:link { text-decoration: none; color: black; }
    a:visited { text-decoration: none; color: black;}
    a:hover { text-decoration: none; }
    a:active { text-decoration: none; }
    flex-direction: column;

    &:hover ${Info}{
        opacity: 1;
    }
    
`;

const Circle = styled.div`
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background-color: #c0c0c0;
    position: absolute;

`;

const Prices = styled.div`
    width = 100vw;
    margin-left: 3vw; 
    margin-right: auto;
    font-size: 20px;
`;

const Image = styled.img`
    height: 75%;
    z-index: 2;

`;


const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease; 
    cursor: pointer;
    a:link { text-decoration: none; color: black; }
    a:visited { text-decoration: none; color: black;}
    a:hover { text-decoration: none; }
    a:active { text-decoration: none; }


    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;


const Product = ({item}) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(0);
    const [isItemInCart, setIsItemInCart] = useState(false);
    const itemsInCart = useSelector(state => state.cart.itemsInCart);




    const isItemAlreadyInCart = (array, id) => {
        var found = false;
        for (let index = 0; index < array.length; index++) {
            if (id == array[index]) { found = true}
        }
        return found  

    }

    const handleClick = () => {
        setIsItemInCart(true);
        var price = item.discountedPrice 
        if (price == undefined) {
            price = item.originalPrice   
        }
        console.log(item)
        dispatch(addProduct({product:item, quantity, price: parseFloat(price), id: item.id}));
      }

  return (
    <Container>
        <Image src={item.img}/>
        <Prices>
            <p>{item.title.length <= 18 ? item.title : item.title.substring(0, 22) + '...' }</p>

            {item.discountedPrice == null ? 
            <>
            <p> ${item.originalPrice}</p>
            </>
            :
            <>
            <p style={{color: 'red', textDecoration: 'line-through'}}> ${item.originalPrice}</p>
            <p> ${item.discountedPrice}</p>
            </>
            }
            
        </Prices>

        

        <Info>
            <Icon onClick={handleClick} style={ isItemInCart || isItemAlreadyInCart(itemsInCart, item.id) ? {pointerEvents:'none', color: 'white', backgroundColor: 'teal'} : {color: 'black'}} >
                <FiShoppingCart />
            </Icon>
            <Link to={'/product/' +item.id}>
                <Icon>
                    <BiSearchAlt2/>
                </Icon>
            </Link>

        </Info>
    </Container>
  )
}

export default Product

