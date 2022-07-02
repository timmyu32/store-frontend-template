import styled from 'styled-components';
import { Link } from "react-router-dom";
import { mobile } from '../responsive';

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
    ${mobile({
        height: '200px'
    })}
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Info = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`;

const Title = styled.h1`
    color: black;
    margin: 0px 20px;
    background-color: rgba(255, 255, 255, 0.9); 
`;

const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    font-color: gray;
    cursor: pointer;
    color: black;
    font-weight: 600;
    border: solid 2px black;
    transition: all 0.6s ease;

    &:hover{
        background-color: black;
        color: white;
    }
`;



const CategoryItem = ({item}) => {

    

  return (
    <Container>
        <Image src={item.img}/>
        <Info>
            <Title>{item.title}</Title>
            <Link to={'/search/style='+ item.title.toLowerCase()}>
                <Button>SHOP {item.title.toUpperCase()}</Button>
            </Link>
        </Info>
    </Container>
  )
}

export default CategoryItem
