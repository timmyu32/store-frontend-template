import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { IoAddCircleSharp, IoRemoveCircleSharp } from 'react-icons/io5';
import axios from "axios";
import { useParams } from 'react-router-dom'
import { addProduct } from '../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';

// import {Carousel}  from 'react-responsive-carousel';



const Container = styled.div`

`;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
`;
const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 90%;
    height: 90vh;
    object-fit: cover;
`;
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;

`;
const Title = styled.h1`
    font-weight: 200;
`;
const Desc = styled.p`
    margin: 20px 0px;
`;
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: 30px 0px;
`;

const Filter = styled.div`
    display: flex;
    align-items: center;   
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`;

const FilterSize = styled.select`
    padding: 5px`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: space-between;

`;
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;

`;
const Amount = styled.span`
    width: 30px;
    height: 30px;
    display: flex;
    border-radius: 10px;
    border: 1px solid gray;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;
const Button = styled.button`
    padding: 15px;
    border: 2px solid gray;
    background-color: white;
    transition: all 0.5s ease;
    cursor: pointer;
    font-weight: 600;
    
    &:hover{
        background-color: teal;
        color: white;
    }

`;



const Product = (props) => {
    const [data, setData] = useState({});
    const [formatedData, setFData] = useState({});
    const [imgs, setImgs] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [currentPhoto, setCurrentPhoto] = useState(null);
    const [isItemInCart, setIsItemInCart] = useState(false);

    const dispatch = useDispatch();
    const itemsInCart = useSelector(state => state.cart.itemsInCart);
    console.log(itemsInCart)

    const { id } = useParams();

    useEffect(() =>{
        getItems();
        window.scrollTo(0, 0);

    }, []);

    const getItems = async () => {
        await axios.get("https://depop-shop-api-v1.herokuapp.com/api/product/"+ id).then(res => {
        setData(res.data.product[0]);
        // console.log()
        setFData({
            img: res.data.product[0].img[0],
            title: res.data.product[0].title,
            id: res.data.product[0].id,
            discountedPrice: res.data.product[0].price1
        });

        setImgs(res.data.product[0].img);
        setCurrentPhoto(res.data.product[0].img[0])
        console.log(res.data.product[0]);
        const retList = [];
        res.data.product[0].img.map(item => (
            retList.push({
                image: item,
                caption: '...'
            })
        ))

        }).catch(err => console.log(err));
        
    }

    const isItemAlreadyInCart = (array, id) => {
        var found = false;
        for (let index = 0; index < array.length; index++) {
            if (id == array[index]) { found = true}
        }
        return found  

    }  
      const handleClick = () => {
        setIsItemInCart(true);
        dispatch(addProduct({product:formatedData, quantity, price: parseFloat(data.price2), id: formatedData.id}));
      }

      const changePhoto = (src) => {
        setCurrentPhoto(src);
      }

    
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
        
            <ImgContainer>                    
               <Image src={currentPhoto}/>
               {imgs.map(src => (<img style={{height:'20%', width:'20%', cursor:'pointer', marginRight:'5px'}} onClick={() => changePhoto(src)}  src={src}></img>))}
            </ImgContainer>
            <InfoContainer>
                <Title>{data.title}</Title>
                <Desc>{data.desc}</Desc>
                {data.price2 == null ? 
                <>
                <Price>${data.price1}</Price>
                </>
                :
                <>
                <Price style={{color: 'red', textDecoration: 'line-through', fontSize: '30px'}}>${data.price1}</Price>
                <br />
                <Price>${data.price2}</Price>
                </>
                
                }

                <FilterContainer>
                    <Filter>
                        <FilterTitle>Size: {data.size}</FilterTitle>
                        {/* <FilterSize>
                            
                            <FilterSizeOption></FilterSizeOption>
                        </FilterSize> */}
                    </Filter>
                </FilterContainer>

                <AddContainer>
                    {/* <AmountContainer>
                        <IoRemoveCircleSharp color='teal'/>
                        <Amount>1</Amount>
                        <IoAddCircleSharp color='teal'/>
                    </AmountContainer> */}
                    <Button style={ isItemInCart || isItemAlreadyInCart(itemsInCart, data.id)  ? {pointerEvents:'none', color: 'white', backgroundColor: 'teal'} : {color: 'black'}} 
                    
                    onClick={handleClick}>{isItemInCart || isItemAlreadyInCart(itemsInCart, data.id)  ? 'ADDED TO CART' : 'ADD TO CART' }</Button>
                </AddContainer>
            </InfoContainer>

        </Wrapper>
        <Newsletter/>
        <Footer/>
      
    </Container>
  )
}

export default Product
