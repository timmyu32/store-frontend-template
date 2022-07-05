
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
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
    color: black;
    background-color: white;

`;

const Icon = styled.div`
    a:link { text-decoration: none; color: white; }
    a:visited { text-decoration: none; color: white;}
    a:hover { text-decoration: none;  color: white;}
    a:active { text-decoration: none; color: white;}
    color: white;
    margin-right: 30px;

`;

const HeaderContainer = styled.div`
    color: darkgray;
    justify-content: space-between;
    display: flex;
    font-size: 24px;
    padding: 5px;
`;

const Header = styled.div`
    font-size: 50px;

`;
const List = styled.ul`
    margin-top: 5px;
    padding: 0;
    list-style: none;

`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    color: lightgray;
    font-size: 20px;

`;


const MobileFilterMenu = () => {
    const [colorList, setColorList] = useState([]);
    const [styleList, setStyleList] = useState([]);
    const [sizeList, setSizeList] = useState([]);

    const [colors, setColors] = useState(false);
    const [styles, setStyles] = useState(false);
    const [sizes, setSizes] = useState(false);
    const [dataFetched, setDataFetched] =  useState(false);
    const [filters, setFilters] = useState({});
    const history = useNavigate();

    useEffect(() =>{
        window.scrollTo(0, 0);
        getMeta();
    }, []);


   
    const getMeta = async () => {
        try {
            await axios.get(process.env.REACT_APP_API_URL + "/api/products/metadata").then(res => {
            setColorList(res.data.colors);
            setStyleList(res.data.styles);
            setSizeList(res.data.sizes);
            setDataFetched(true);
            
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
            
            {dataFetched? 
            
            <><HeaderContainer onClick={() => setColors(!colors)}>
            <Header>Colour.</Header>
            {colors ? <BiChevronUp/> : <BiChevronDown/>}
        </HeaderContainer>
        {colors ? <>

        <List>
            {colorList.map(color => {
                return <ListItem key={color} onClick={() => 
                {
                    history("/search/" + 'colour'+'=' + color.toLowerCase());
                    window.location.reload(false);
                }
                }>{color}</ListItem>
            })}
        </List>
        </> : <></>}

        <HeaderContainer onClick={() => setSizes(!sizes)}>
            <Header>Size.</Header>
            {sizes ? <BiChevronUp/> : <BiChevronDown/>}
        </HeaderContainer>
        {sizes ?  <>
        <List>
            {sizeList.map(size => {
                return <ListItem key={size} onClick={() => 
                {
                    history("/search/" + 'size'+'=' + size.toLowerCase());
                    window.location.reload(false);
                }
                }>{size}</ListItem>
            })}
        </List>


        </> : <></>}

        <HeaderContainer onClick={() => setStyles(!styles)}>
            <Header>Style.</Header>
            {styles ? <BiChevronUp/> : <BiChevronDown/>}
        </HeaderContainer>
        {styles ? <>
        <List>
            {styleList.map(style => {
                return <ListItem key={style} onClick={() => 
                {
                    history("/search/" + 'style'+'=' + style.toLowerCase());
                    window.location.reload(false);
                }
                }>{style}</ListItem>
            })}
        </List>


        </> : <></>}
            </>
            
            :<></>}
            
        </FilterContainer>
    </Container2>
  )
}

export default MobileFilterMenu
