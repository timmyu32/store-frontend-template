import React, { useState, setState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryItem from './CategoryItem';
import axios from "axios";
import { mobile } from '../responsive';

import { ThreeDots,  } from  'react-loader-spinner'



const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    width: 100%;
    ${mobile({
      flexDirection: 'column',
    })} 
`;

const Categories = () => {

    const [dataFetched, setDataFetched] = useState(false); 
    const [data, setData] = useState([]);

  useEffect(() =>{
    get3Categories();
  }, []);

  const get3Categories = async () => {
    await axios.get(process.env.REACT_APP_API_URL + "/api/categories/3").then(res => {
        setDataFetched(true);
        setData(res.data.categories);
    // console.log(res.data.categories);
    }).catch(err => console.log(err));
    
}


  return (
    <Container>
      {dataFetched ? 
      
      data.map(item => (
        <CategoryItem item={item}/>
       ))
      :
      data.map(item => (
        <ThreeDots color="black" height={80} width={80} />
       ))      
      }
    </Container>

  )
}

export default Categories
