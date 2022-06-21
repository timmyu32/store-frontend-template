import { useState, useEffect } from "react"
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"; 


const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const KEY =  'pk_test_51LAKytLwQTzGsU2aEPkzrMZHPvAihqAZ2gJplNo68kSg8GIUKQEtg1xCDbz6yh11hQf311cwaKVX4zdTodnPeuhf00hY8fRZNy'

  const onToken = (token) => {
    setStripeToken(token);
  }

  useEffect(() =>{
    const makeRequest = async () => {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/stripe/payment',  
        {
          tokenID: stripeToken.id,
          amount: 2000
        });
        console.log(res.data)
      } catch (error) {
        console.log(error)        
      }
    }
    stripeToken && makeRequest()
  }, [stripeToken] )

    return (
      <div>
        {stripeToken ? (<span>Order is Processing...</span>): (
        <StripeCheckout 
        name="GeminiLogisticz"
        billingAddress
        shippingAddress
        description="Thank You for your business"
        amount={2000}
        token={onToken}
        stripeKey={KEY}>
          <button>Pay</button>
        </StripeCheckout>

        )}
       
      </div>
    )
  }
  
  export default Pay
  