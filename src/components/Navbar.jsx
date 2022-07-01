// import React from 'react';
import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { BiSearchAlt2 } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart } from '../redux/cartRedux';
import { logout } from '../redux/userRedux';
import { Link } from "react-router-dom";


const Container = styled.div`
  height: 9vh;
  background-color: black;
  color: white;
  position: fixed;
  z-index: 5;
  width: 100%;

`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`
const SearchContainer = styled.div`
  border: 0.5px solid darkgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`

const Center = styled.div`
  flex: 1;
  text-align: center;
  a:link { text-decoration: none; }
  a:visited { text-decoration: none; color: white;}
  a:hover { text-decoration: none; }
  a:active { text-decoration: none; }
  color: white;
`;

const Logo = styled.h1`
  font-weight: bold;
  a:link { text-decoration: none; }
  a:visited { text-decoration: none; color: white;}
  a:hover { text-decoration: none; }
  a:active { text-decoration: none; }
  color: white;

  &:hover{
    cursor: pointer;
  }
`


const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  a:link { text-decoration: none; }
  a:visited { text-decoration: none; color: white;}
  a:hover { text-decoration: none; }
  a:active { text-decoration: none; }
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: white;
  position: relative;
  a:link { text-decoration: none; }
  a:visited { text-decoration: none; color: white;}
  a:hover { text-decoration: none; }
  a:active { text-decoration: none; }
  
`

const Badge = styled.div`
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  position: absolute;
  top: -10px;
  right: -10px;
`;


const Navbar = () => {
  const searchTerm = useRef(null);
  const quantity = useSelector(state => state.cart.quantity);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();


  
 
  const handleSearch = (href) => {
    console.log('/search=' + searchTerm.current.value)
    if (searchTerm.current.value.length > 0){
      window.location = '/search/' + searchTerm.current.value;
    }
  }

  const handleLogout = () => {
    dispatch(emptyCart());
    dispatch(logout());
  }


  return (
    
    <Container>
      <Wrapper>
        <Left>
        {user.currentUser && user.currentUser.message == 'user logged in' ?
        <MenuItem>Welcome {user.currentUser.user.firstname.toUpperCase()}!</MenuItem> 
        :
        <MenuItem></MenuItem> 
        }
          <SearchContainer >
            <Input ref={searchTerm}/>
            <BiSearchAlt2 onClick={() => handleSearch('products')} style= {{color: 'white', fontSize: 16, marginLeft: '5px', cursor: 'pointer'}} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to='/'>
            <Logo>wafflesandwatsonandme.</Logo>
          </Link>
        </Center>
        <Right>
        {user.currentUser && user.currentUser.user.isAdmin? 
          <Link to='/admin'>
            <MenuItem style={{textDecoration: 'underline'}}>ADMIN SITE</MenuItem> 
          </Link>
          :
          <></>
          }

          <Link to='/products'>
            <MenuItem >SEE ALL PRODUCTS</MenuItem>
          </Link> 
          {user.currentUser && user.currentUser.message == 'user logged in' ? 
          <Link to='/'>
            <MenuItem onClick={handleLogout}>LOGOUT</MenuItem> 
          </Link>
          :
          <>
          <Link to='/register'>
            <MenuItem>SIGN UP FOR FREE</MenuItem>
          </Link>
          <Link to='/login'>
            <MenuItem >LOGIN</MenuItem>  
          </Link>
          </>
          }
          <Link to='/cart'>
            <MenuItem>
              <FiShoppingCart /> 
              {quantity == 0 ? <></>: <Badge>{quantity}</Badge>}
            </MenuItem> 
          </Link>           

        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
