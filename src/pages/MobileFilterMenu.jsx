
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
import { IoCloseSharp } from "react-icons/io5";

const Container2 = styled.div`
    background-color: black;
    color: white;
    height: 100vh;
`;

const FilterContainer = styled.div`
padding: 10px;
display: flex;
flex-direction: column;
`;

const Title = styled.h1`
margin: 20px;
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
margin-bottom: 10px;
color: black;
font-size: 30px;
font-weight: bold;
background-color: #eaeaea;
text-align: center;
padding-top: 20px;
padding-bottom: 20px;
`;

const Option = styled.option`

`;

const Icon = styled.div`
    a:link { text-decoration: none; color: white; }
    a:visited { text-decoration: none; color: white;}
    a:hover { text-decoration: none;  color: white;}
    a:active { text-decoration: none; color: white;}
    color: white;
    margin-right: 30px;

`;


const MobileFilterMenu = () => {
    const [colorList, setColorList] = useState([]);
    const [styleList, setStyleList] = useState([]);
    const [sizeList, setSizeList] = useState([]);
    const [filters, setFilters] = useState({});
    const history = useNavigate();

    useEffect(() =>{
        window.scrollTo(0, 0);
        getMeta();
        // getQueriedProducts();
    }, []);


   
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
    
    // console.log(filters);
  return (
    <Container2>
        <FilterContainer>
            <div className="title-menu" 
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',

            }}>
                <Title>Product Filters.</Title>
                <Link to='/products'>
                    <Icon>
                        <IoCloseSharp size={'40'}/>
                    </Icon>
                </Link>
            </div>
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
                <Select>
                    <Option selected>
                        Newest
                    </Option>
                    <Option>Price (asc)</Option>
                    <Option>Price (decc)</Option>
                </Select>
        </FilterContainer>
    </Container2>
  )
}

export default MobileFilterMenu
