import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { ImInstagram } from "react-icons/im";
import { Link } from 'react-router-dom';
import { mobile } from '../responsive';

const Container2 = styled.div`
    background-color: black;
    color: white;
    padding-bottom: 100px;
    width: 100%;
    a:visited { text-decoration: none; color: darkgray;}
    a:link { text-decoration: none; }color: darkgray;
    a:hover { text-decoration: none; color: darkgray;}
    a:active { text-decoration: none; color: darkgray;}
    
`;

const FilterContainer = styled.div`
padding-top: 50px;
padding: 10px;
display: flex;
flex-direction: column;
`;

const Title = styled.h1`
margin: 20px;
`;

const HeaderContainer = styled.div`
    color: darkgray;
    justify-content: space-between;
    display: flex;
    font-size: 24px;
    padding: 5px;
`;

const Header = styled.div`

`;
const List = styled.ul`
    margin-top: 5px;
    padding: 0;
    list-style: none;

`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    color: darkgray;

`;


const MobileFilterMenu = () => {

    const [aboutUs, setAboutUs] = useState(false);
    const [usefulLinks, setUsefulLinks] = useState(false);
    const [contact, setContact] = useState(false);


   
    
    // console.log(filters);
  return (
    <Container2>
        <FilterContainer>
            <div className="title-menu" 
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:'start',
                width: '100%',

            }}>
                <Title>{process.env.REACT_APP_DEPOP_SHOP}.</Title>
                
                <ImInstagram color='#E4405F' size={30}/>
            </div>

            <HeaderContainer onClick={() => setAboutUs(!aboutUs)}>
                <Header>About us.</Header>
                {aboutUs ? <BiChevronUp/>: <BiChevronDown/>}
            </HeaderContainer>
            {aboutUs ? <>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus exercitationem reprehenderit dolorem magnam sint officiis nobis officia dolores qui iure nemo vitae atque labore nam totam, quidem maiores, molestiae aspernatur.</>: <></>}


            <HeaderContainer onClick={() => setUsefulLinks(!usefulLinks)}>
                <Header>Useful Links.</Header>
                {usefulLinks ? <BiChevronUp/>: <BiChevronDown/>}
            </HeaderContainer>
            {usefulLinks ? <>
            <List>
                <ListItem style={{textDecoration:'underline'}}>
                    <Link to='/'>
                        Home
                    </Link>
                </ListItem>
                <ListItem style={{textDecoration:'underline'}}>
                    <Link to='/cart'>
                        Cart
                    </Link>                    
                </ListItem>
                <ListItem>Terms </ListItem>
            </List>

            </>
            : <></>}


            <HeaderContainer onClick={() => setContact(!contact)}>
                <Header>Contact.</Header>
                {contact ? <BiChevronUp/>: <BiChevronDown/>}
            </HeaderContainer>
            {contact ? <>
            <List>
            {/* <ListItem>
                <IoLocationSharp style={{marginRight:"10px"}}/>
                123 Address Street, City NY, 01234
            </ListItem> */}
            <ListItem>
                <MdEmail style={{marginRight:"10px"}}/>
                contact@email.com
            </ListItem>
            </List>
            
            
            </>: <></>}

            
        </FilterContainer>
    </Container2>
  )
}

export default MobileFilterMenu
