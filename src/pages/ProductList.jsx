// import React from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
// import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import DetailedProducts from '../components/DetailedProducts';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
import { HiMenu } from "react-icons/hi";
import MobileFooter from '../components/MobileFooter'


const Container = styled.div`
    width: 100%
`;

const Container2 = styled.div`
    display: flex;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    ${mobile({
        display: 'none',
      })} 
`;

const Title = styled.h1`
    margin: 20px;
    text-align: center;
`;

const Filter = styled.div`
    margin-right: 20px;
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 10px;
`;

const Icon = styled.div`
    a:link { text-decoration: none; color: black; }
    a:visited { text-decoration: none; color: black;}
    a:hover { text-decoration: none;  color: black;}
    a:active { text-decoration: none; color: black;}
    color: black;
    margin-right: 30px;

`;

const Option = styled.option`

`;
const Button = styled.button`
    width: 30%;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 20px;
    background-color: black;
    color: white;
    transition: all 0.5s ease;
    cursor: pointer;
    font-weight: 600;
    justify-content: center;


    &:hover{
        background-color: white;
        color: black;
    }
`;


const ProductList = (props) => {
    const [colorList, setColorList] = useState([]);
    const [styleList, setStyleList] = useState([]);
    const [sizeList, setSizeList] = useState([]);
    const [filters, setFilters] = useState({});
    const [lmt, setLimit] = useState(0)
    const [clickIndex, setClickIndex] = useState(0)
    const history = useNavigate();

    useEffect(() =>{
        window.scrollTo(0, 0);
        getMeta();
    }, []);


    const getQueriedProducts = () => {
        axios.get(process.env.REACT_APP_API_URL + "/api/pp?style=vintage").then(res => {
            console.log(res)
        }).catch(err => (console.log(err)));
    };


    const getMeta = async () => {
        try {
            await axios.get(process.env.REACT_APP_API_URL + "/api/products/metadata").then(res => {
            setColorList(res.data.colors);
            setStyleList(res.data.styles);
            setSizeList(res.data.sizes);

            
            }).catch(err => console.log(err));
        } catch (error) {
           console.log(error);
        }
        
    }

    const handleFilter = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
        })
        console.log("/search/" + e.target.name +'=' + e.target.value);
        history("/search/" + e.target.name +'=' + e.target.value.toLowerCase());
        window.location.reload(false);
    };

    const handleClick = () => {
        setClickIndex(clickIndex+1);
        setLimit(48 + (24 * clickIndex));
    }

    const mql = window.matchMedia('(max-width: 480px)');
  
    let mobileView = mql.matches;
  
    
    // console.log(filters);

  return (
    <Container>
        <Navbar/>
        <br />
        <br />
        <br />
        <Announcement/>
        {mobileView ? 
        <div className="title-menu" 
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',

        }}>
            <Title>Products.</Title>
            <Link to='/mobile-menu'>
                <Icon>
                    <HiMenu size={'40'}/>
                </Icon>
            </Link>
        </div>
        :
        <Title>Products.</Title>
        }
        <FilterContainer>
            <Container2>
            <Filter><FilterText>Filter Products</FilterText></Filter>
            <Select name="colour" onChange={handleFilter}>
                <Option disabled selected>
                    Colour
                </Option>
                {colorList.map(color => (<Option>{color}</Option>))}
            </Select>
            <Select name="style" onChange={handleFilter}>
                <Option disabled selected>
                    Style
                </Option>
                {styleList.map(style => (<Option>{style}</Option>))}
            </Select>
            <Select name="size" onChange={handleFilter}>
                <Option disabled selected>
                    Size
                </Option>
                {sizeList.map(size => (<Option>{size}</Option>))}
            </Select>
            </Container2>
            <Container2>
                {/* <Filter><FilterText>Sort Products</FilterText></Filter>
                <Select>
                    <Option selected>
                        Newest
                    </Option>
                    <Option>Price (asc)</Option>
                    <Option>Price (decc)</Option>
                </Select> */}
            </Container2>
        </FilterContainer>
        <div className="dpc" style={{padding:'20px'}}>
            {lmt == 0?
            <DetailedProducts limit={24}/>
            :
            <DetailedProducts limit={lmt}/>
            }    
        </div>  
        <div className="butn" style={{textAlign:'center'}}>
            <Button onClick={() => handleClick()}>Show More.</Button>
        </div>

        <Newsletter/>
        {mobileView ?  <MobileFooter/> : <Footer/>}


      
    </Container>
  )
}

export default ProductList
