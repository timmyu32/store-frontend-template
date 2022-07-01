import { useState, setState, useEffect } from 'react';
import axios from "axios";
import styled from 'styled-components';
import { popularProducts } from '../data';
import Product from './Product';




const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;


const Products = (props) => {
    const [data, setData] = useState([]);
    const [dataFetched, setDataFetched] = useState(false); 



    useEffect(() =>{
        getPopularItems();
    }, []);

    const getPopularItems = async () => {
        await axios.get(process.env.REACT_APP_API_URL + "/api/pp/"+props.limit).then(res => {
        setData(res.data.pp);
        setDataFetched(true);
        }).catch(err => console.log(err));
        
    }


  return (
    <Container>
        {dataFetched?
        data.map(item => (
            <Product item={item} key={item.id}/>
        ))
        :
        <></>}
        
    </Container>
      
  )
}

export default Products
