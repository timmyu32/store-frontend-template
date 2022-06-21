import { useState, setState, useEffect } from 'react';
import axios from "axios";
import styled from 'styled-components';
import Product from './Product';
import { useParams } from 'react-router-dom'
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;


const DetailedProducts = (props) => {
    const [data, setData] = useState([]);
    

    useEffect(() =>{
        getItems();
    }, []);

    const getItems = async () => {
        // console.log(window.location);
        try {
            const path = window.location.pathname.split('search/')
            if (path.length > 1){
                await axios.get("http://127.0.0.1:8000/api/search/"+path[1]).then(res => {
                setData(res.data.product);
                // console.log(props);
                console.log(res.data.product);
                }).catch(err => console.log(err));
            }else{
                await axios.get("http://127.0.0.1:8000/api/pp/"+props.limit).then(res => {
                setData(res.data.pp);
                // console.log(props);
                // console.log(res.data.pp[0]);
                }).catch(err => console.log(err));
            }
      
        } catch (error) {
            await axios.get("http://127.0.0.1:8000/api/pp/"+props.limit).then(res => {
            setData(res.data.pp);
            // console.log(props);
            // console.log(res.data.pp[0]);
            }).catch(err => console.log(err));
        }
        
    }


  return (
    <Container>
        {data.map(item => (
            <div>
                <Product item={item} key={item.id}/>
            </div>
        ))}
    </Container>
      
  )
}

export default DetailedProducts
