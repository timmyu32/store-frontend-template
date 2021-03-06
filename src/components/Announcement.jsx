import { mobile } from '../responsive';
import styled from 'styled-components';


const Container = styled.div`
    height: 30px;
    background-color: #404040;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    ${mobile({
    width: '100%'
  })} 
`;

const Announcement = () => {
  return (
    <Container>
        DEAL INCOMING! Free Shipping on Orders Over $20!
    </Container>
  )
}

export default Announcement
