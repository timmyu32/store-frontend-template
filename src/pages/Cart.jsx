import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import { MdDelete } from "react-icons/md";
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"; 
import { emptyCart, removeProduct } from '../redux/cartRedux';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Popup from '../components/Popup';
// import { IoAddCircleSharp, IoRemoveCircleSharp } from 'react-icons/io5';



const Container = styled.div`
    width:100%;
`;

const Wrapper = styled.div`
    padding: 20px;
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;
const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    background-color: black;
    transition: all 0.5s ease;
    font-weight: 600;
    color: white;


    &:hover{
        background-color: white;
        color: black;
    }
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;

`;
const Info = styled.div`
    flex: 3;
`;
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    background-color: #eee;
    height: 50vh;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
`;
const ProductDetails = styled.div`
    flex: 2;
    display: flex;
`;

const PriceDetails = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ProductAmountContainer =styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const Amount =styled.div`
    font-size: 24px;
    margin: 5px;

`;

const ProductPrice =styled.div`
    font-size: 30px;
    font-weight: 200;

`;

const Image = styled.img`    
    width: 200px;
   
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;    
    justify-content: space-around;
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 2px;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;
const SummaryItem = styled.div`
    margin: 20px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === 'total' && '500'};
    font-size: ${props => props.type === 'total' && '24px'};

`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: white;
    transition: all 0.5s ease;
    color: black;
    cursor: pointer;
    font-weight: 600;

    &:hover{
        background-color: black;
        color: white;
    }
`;
const Input = styled.input`
    min-width: 40%;
    margin: 0px 10px 0px 0px;
    padding: 7px;
    color: black;
    font-size: 18px;
    font-weight: 500;
`


const ProductName = styled.span``;

const ProductID = styled.span``;

const ProductSize = styled.span``;

const DeleteButton = styled.div`
    color:red; 
    height:60px; 
    width:30px;
    display: flex;
    cursor: pointer;
`;


const KEY =  'pk_test_51LAKytLwQTzGsU2aEPkzrMZHPvAihqAZ2gJplNo68kSg8GIUKQEtg1xCDbz6yh11hQf311cwaKVX4zdTodnPeuhf00hY8fRZNy'



const Cart = () => {
    const cart = useSelector(state => state.cart);
    const [isItemInCart, setIsItemInCart] = useState(false);
    const [stripeToken, setStripeToken] = useState(null);
    const [discountAmount, setDiscountAmount] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const history = useNavigate();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const discount = useRef(null);
    const [Xact, seXact] = useState(null);





    const onToken = (token) => {
        setStripeToken(token);
    }

    const roundToTwo = (num) => {
        return +(Math.round(num + "e+2")  + "e-2");
    }

    const removeItemFromCart = (productID) => {
        if (cart.itemsInCart.length == 1){
            dispatch(emptyCart())
        }else{
        const newItemsInCart = []
        const newProducts = []
        var price = 0
        for (let index = 0; index < cart.itemsInCart.length; index++) {
            if (productID != cart.itemsInCart[index]){
                newItemsInCart.push(cart.itemsInCart[index])
            }
            if (productID != cart.products[index].id){
                newProducts.push(cart.products[index])
            }else{
                price = cart.products[index].discountedPrice == null || undefined ? cart.products[index].originalPrice : cart.products[index].discountedPrice
            }
        }
        dispatch(removeProduct({
            quantity: 1, 
            products: newProducts,
            price: price,
            itemsInCart: newItemsInCart 
        }))
        }
    }

    const applyDiscount = async (code) => {
        const res = await axios.get(process.env.REACT_APP_API_URL + '/api/codes/'+code)
        if (res.data.discount == null) {
            setDiscountAmount('incorrect code')            
        }else{
            setDiscountAmount(res.data.discount)
        }
        console.log(discountAmount)
        console.log(typeof discountAmount)


    }

    const togglePopup = () => {
        setIsOpen(!isOpen);

    }

    const sendOrderDetails = (res) => {
        const orderDetails = {
            billingAddress: res.data.tranaction.billing_details.address,
            firstName: user.currentUser.user.firstname,
            lastName: user.currentUser.user.lastname,
            email: user.currentUser.user.email,
            products: cart.products,
            amount: res.data.tranaction.amount,
            isShipped: false
          }
        //   console.log(orderDetails);
          const res2 = axios.post(process.env.REACT_APP_API_URL + '/api/order/create',
          {
            order: orderDetails
          });

    }


    useEffect(() =>{
        window.scrollTo(0, 0);
        setIsItemInCart(true);
        const makeRequest = async () => {

            try {
              const res = await axios.post(process.env.REACT_APP_API_URL + '/api/stripe/payment',  
              {
                tokenID: stripeToken.id,
                amount: typeof discountAmount == 'number' ? roundToTwo(cart.total * ((100-discountAmount)/100) )*100 : roundToTwo(cart.total)*100 ,
              });
            //   console.log(res.data)
            //   seXact(res.data.tranaction);
            //   console.log(res.data.tranaction);
              const res2 = await axios.put(process.env.REACT_APP_API_URL + '/api/product/mark-as-sold/', {IDs:cart.itemsInCart});
              sendOrderDetails(res)

              dispatch(emptyCart())
            //   history('/success', res.data)   

            } catch (error) {
              console.log(error)     
            }
          }
          stripeToken && cart.total >=1 && makeRequest()
        
    }, [stripeToken, cart.total, history] );


  return (
    <Container>
        <Navbar/>
        <br />
        <br />
        <br />
        <Announcement/>
        {stripeToken && isOpen && <Popup handleClose={() => togglePopup()} content={<>
            <h1>Thank you for shopping with us! Your order/shipping details will be sent via email shortly.</h1>
        </>}/>
        }
        <Wrapper>
            <Title>YOUR CART.</Title>
            <Top>
                <Link to='/products'>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                </Link>
                <TopButton style={{backgroundColor: 'red'}} onClick={() => dispatch(emptyCart())}>EMPTY CART</TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cart.products.map(product => (
                    <Product>
                        <ProductDetails>
                            <Link to={`/product/${product.id}`}>
                                <Image style={{cursor:'pointer'}} src={product.img}/>
                            </Link>
                            <Details>
                                <ProductName><b>Item: </b>{product.title}</ProductName>
                                <ProductID><b>ID: </b>{product.id}</ProductID>
                            </Details>
                        </ProductDetails>
                        <PriceDetails>
                            {/* <ProductAmountContainer>
                                <IoRemoveCircleSharp color='teal'/>
                                <Amount>1</Amount>
                                <IoAddCircleSharp color='teal'/>
                            </ProductAmountContainer> */}
                            {product.discountedPrice == null || undefined ?
                            <ProductPrice>${product.originalPrice}</ProductPrice>
                            :
                            <ProductPrice>${product.discountedPrice}</ProductPrice>
                            }
                            <DeleteButton>
                                <MdDelete onClick={() => removeItemFromCart(product.id)} style={{height:'100%', width:'100%'}}></MdDelete>
                            </DeleteButton>
                        </PriceDetails>
                    </Product>
                    ))}
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>${roundToTwo(cart.total)}</SummaryItemPrice>
                    </SummaryItem>

                    <SummaryItem>
                        {discountAmount == null ? <></> : 
                        discountAmount == 'incorrect code' ?<></>:
                        <>
                        <SummaryItemText>Discount</SummaryItemText>
                        <SummaryItemPrice>${roundToTwo(cart.total - (cart.total * ((100-discountAmount)/100) )) }</SummaryItemPrice>
                        </>}
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>
                            <Input type="text" placeholder='COUPON CODE'  ref={discount}/>
                        </SummaryItemText>
                        <SummaryItemPrice><Button onClick={() => applyDiscount(discount.current.value)}>APPLY</Button></SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        {discountAmount == null ? <></> : 
                        
                        discountAmount == 'incorrect code' ?
                        <SummaryItemText style={{color:'red'}}>Invalid Code</SummaryItemText>
                        :
                        <SummaryItemText style={{color:'green'}}>{discountAmount}% OFF</SummaryItemText>
                        }
                    </SummaryItem>
                    <SummaryItem type="total">
                        <SummaryItemText>Total</SummaryItemText>

                        {typeof discountAmount == 'number' ? 
                        
                        <SummaryItemPrice>${roundToTwo(cart.total * ((100-discountAmount)/100) ) }</SummaryItemPrice>
                    
                        :
                        <SummaryItemPrice>${roundToTwo(cart.total)}</SummaryItemPrice>
                        
                        }

                    </SummaryItem>
                    {user.currentUser && user.currentUser.message == 'user logged in' ?
                    <StripeCheckout
                    name="STORE_NAME_HERE"
                    email={user.currentUser.user.email}
                    billingAddress
                    shippingAddress
                    description="thank you for your business"
                    amount={typeof discountAmount == 'number' ? roundToTwo(cart.total * ((100-discountAmount)/100) )*100 : roundToTwo(cart.total)*100 }
                    token={onToken}
                    stripeKey={KEY}
                    alipay={true}
                    googlepay>
                    <Button>PROCEED TO CHECK-OUT</Button>
                    </StripeCheckout>
                    
                    :
              
                    <Button onClick={() => history('/login')}>LGOING/REGISTER TO CHECK-OUT</Button>
                    }

                </Summary>
            </Bottom>
        
        
        </Wrapper>


        <Footer/>
    </Container>
  )
}

export default Cart
