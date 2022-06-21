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


const Container = styled.div`

`;

const Container2 = styled.div`
    display: flex;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
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
    margin-right: 10px;
`;

const Option = styled.option`

`;


const ProductList = (props) => {
    const [colorList, setColorList] = useState([]);
    const [styleList, setStyleList] = useState([]);
    const [sizeList, setSizeList] = useState([]);
    const [filters, setFilters] = useState({});

    useEffect(() =>{
        window.scrollTo(0, 0);
        getMeta();
        getQueriedProducts();
    }, []);


    const getQueriedProducts = () => {
        axios.get("http://127.0.0.1:8000/api/pp?style=vintage").then(res => {
            console.log(res)
        }).catch(err => (console.log(err)));
    };


    const getMeta = async () => {
        try {
            await axios.get("http://127.0.0.1:8000/api/products/metadata").then(res => {
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

    };
    // console.log(filters);

  return (
    <Container>
        <Navbar/>
        <br />
        <br />
        <br />
        <Announcement/>
        <Title>Dress Shirts</Title>
        <FilterContainer>
            <Container2>
            <Filter><FilterText>Filter Products</FilterText></Filter>
            <Select name="color" onChange={handleFilter}>
                <Option disabled selected>
                    Color
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
                <Filter><FilterText>Sort Products</FilterText></Filter>
                <Select>
                    <Option selected>
                        Newest
                    </Option>
                    <Option>Price (asc)</Option>
                    <Option>Price (decc)</Option>
                </Select>
            </Container2>
        </FilterContainer>  
        <DetailedProducts limit={0}/>
        <Newsletter/>
        <Footer/>

      
    </Container>
  )
}

export default ProductList
